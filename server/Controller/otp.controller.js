import crypto from "crypto"
import nodemailer from "nodemailer"

// In-memory store for demo (use DB in production)
const otpStore = {}

const sendOtp = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: "Email is required" })

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Store OTP (expires in 5 min)
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }

  // Send OTP via email
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // set in .env
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    })

    res.json({ message: "OTP sent successfully" })
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message })
  }
}

const verifyOtp = (req, res) => {
  const { email, otp } = req.body
  const record = otpStore[email]
  if (!record) return res.status(400).json({ message: "No OTP sent to this email" })
  if (Date.now() > record.expires) return res.status(400).json({ message: "OTP expired" })
  if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" })

  // OTP valid, remove from store
  delete otpStore[email]
  res.json({ message: "OTP verified" })
}
// At the end of otp.controller.js
export default { sendOtp, verifyOtp }