import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import oauth2Client from "../utils/googleConfig.js"
import axios from "axios"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadMultipleFiles } from "../utils/cloudinary.js"
import nodemailer from "nodemailer"

const salt = bcrypt.genSaltSync(10)
const secret = "jn4k5n6n5nnn6oi4n"

const signup = async (req, res) => {
  try {
    const { fullname, email, password, location } = req.body

    // 🔥 Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // 🔥 Hash password
    const hashPassword = await bcrypt.hash(password, 10)

    let profilePicUrl = null

    // Handle profile picture upload only if file exists
    if (req.file) {
      const profileLocalPath = req.file.path
      console.log("localProfilePath->", profileLocalPath)

      try {
        const profile = await uploadMultipleFiles([profileLocalPath])
        console.log("uploading the profile pic on the cloudinary", profile)
        profilePicUrl = profile?.[0]?.url
        console.log("Profile URL ->", profilePicUrl)
      } catch (error) {
        console.log("Error while uploading profile pic", error)
        return res.status(500).json({ message: "Failed to upload profile pic" })
      }
    }

    // 🔥 Create user
    const createUser = await User.create({
      fullname,
      email,
      password: hashPassword,
      location,
      profilePic: profilePicUrl,
    })

    // 🔥 Generate JWT Token
    const token = jwt.sign({ _id: createUser._id, email }, secret, { expiresIn: "5h" })

    // ✅ Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60 * 60 * 1000, // 5 hours
    })

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createUser._id,
        fullname: createUser.fullname,
        email: createUser.email,
        role: "user",
        location: createUser.location,
        profilePic: createUser.profilePic,
      },
      token,
    })
  } catch (error) {
    console.error("Error in signup:", error.message)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const login = async (req, res) => {
  try {
    console.log("Login attempt started")

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    console.log("Searching for user with email:", email)

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    console.log("User found:", user.fullname)

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    console.log("Password verified successfully")

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "9h" })

    // ✅ Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 9 * 60 * 60 * 1000, // 9 hours
    })

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: "user",
        location: user.location,
        profilePic: user.profilePic,
      },
      token,
    })
  } catch (error) {
    console.error("Error in logging the user:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Clear the token cookie
    return res
      .cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
      })
      .status(200)
      .json({ message: "Successfully logged out" })
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message })
  }
})

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query
    if (!code) {
      return res.status(400).json({ message: "Authorization code is required" })
    }

    console.log("Google OAuth code received:", code)

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    console.log("Tokens received from Google")

    // Fetch user info from Google
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    )
    const { email, name, picture } = userRes.data

    console.log("Google user info:", { email, name })

    // Check if user exists; if not, create one
    let user = await User.findOne({ email })
    if (!user) {
      console.log("Creating new user from Google OAuth")
      user = await User.create({
        fullname: name,
        email,
        role: "user",
        location: "Not specified", // Default location for Google users
        password: "google_oauth", // Placeholder password for OAuth users
        profilePic: picture,
      })
    } else {
      console.log("Existing user found:", user.fullname)
      // Update profile picture if it's from Google and user doesn't have one
      if (picture && !user.profilePic) {
        user.profilePic = picture
        await user.save()
      }
    }

    // Generate JWT Token
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "456h" })

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 456 * 60 * 60 * 1000, // 456 hours
    })

    console.log("Cookie set for google login.")

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: "user",
        location: user.location,
        profilePic: user.profilePic,
      },
      token,
    })
  } catch (error) {
    console.error("Error in Google login:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// In-memory OTP storage (in production, use Redis or database)
const otpStorage = new Map()

// Email transporter configuration
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your app password
    },
  })
}

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send OTP via email
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP with expiration
    otpStorage.set(email, {
      otp,
      expiresAt,
      attempts: 0,
    })

    // Create email transporter
    const transporter = createEmailTransporter()

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code - MyApp",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p style="color: #666; text-align: center; margin-top: 20px;">
            This OTP will expire in 10 minutes. Do not share this code with anyone.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    console.log(`OTP sent to ${email}: ${otp}`) // Remove in production

    res.status(200).json({
      message: "OTP sent successfully",
      email,
    })
  } catch (error) {
    console.error("Error sending OTP:", error)
    res.status(500).json({ message: "Failed to send OTP" })
  }
}

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" })
    }

    // Get stored OTP data
    const storedOTPData = otpStorage.get(email)

    if (!storedOTPData) {
      return res.status(400).json({ message: "OTP not found or expired" })
    }

    // Check if OTP is expired
    if (Date.now() > storedOTPData.expiresAt) {
      otpStorage.delete(email)
      return res.status(400).json({ message: "OTP has expired" })
    }

    // Check attempts (max 3 attempts)
    if (storedOTPData.attempts >= 3) {
      otpStorage.delete(email)
      return res.status(400).json({ message: "Too many failed attempts. Please request a new OTP." })
    }

    // Verify OTP
    if (storedOTPData.otp !== otp.toString()) {
      storedOTPData.attempts += 1
      otpStorage.set(email, storedOTPData)
      return res.status(400).json({
        message: "Invalid OTP",
        attemptsLeft: 3 - storedOTPData.attempts,
      })
    }

    // OTP is valid - remove from storage
    otpStorage.delete(email)

    // Get user data
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "24h" })

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })

    res.status(200).json({
      message: "OTP verified successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        location: user.location,
        profilePic: user.profilePic,
      },
      token,
    })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    res.status(500).json({ message: "Failed to verify OTP" })
  }
}

// Resend OTP
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    // Check if there's an existing OTP request
    const existingOTP = otpStorage.get(email)
    if (existingOTP && Date.now() < existingOTP.expiresAt) {
      // Check if it's been at least 1 minute since last OTP
      const timeSinceLastOTP = Date.now() - (existingOTP.expiresAt - 10 * 60 * 1000)
      if (timeSinceLastOTP < 60 * 1000) {
        return res.status(429).json({
          message: "Please wait before requesting a new OTP",
          waitTime: Math.ceil((60 * 1000 - timeSinceLastOTP) / 1000),
        })
      }
    }

    // Use the same sendOTP logic
    await sendOTP(req, res)
  } catch (error) {
    console.error("Error resending OTP:", error)
    res.status(500).json({ message: "Failed to resend OTP" })
  }
}

export { signup, login, googleLogin, logoutUser, sendOTP, verifyOTP, resendOTP }
