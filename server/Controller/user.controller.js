import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import oauth2Client from "../utils/googleConfig.js"
import axios from "axios"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadMultipleFiles } from "../utils/cloudinary.js"

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

const header = asyncHandler(async (req, res) => {
  console.log("req cookie  ", req.cookies)

  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" })
    }
    return res.json(info)
  })
})

// login
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

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Fetch user info from Google
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    )
    const { email, name, picture } = userRes.data

    // Check if user exists; if not, create one
    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        role: "user",
        location: "Not specified", // Default location for Google users
        password: "google_oauth", // Placeholder password for OAuth users
        profilePic: picture,
      })
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

export { signup, login, header, logoutUser, googleLogin }
