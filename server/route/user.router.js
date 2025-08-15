import express from "express"
import {
  signup,
  login,
  googleLogin,
  logoutUser,
  sendOTP,
  verifyOTP,
  resendOTP,
  getProfile,
} from "../Controller/user.controller.js";
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router()

// Signup route with optional file upload
// router.route("/signup").post(upload.single("profilePic"), signup)

// Login route
router.post("/login", login)

// Google OAuth route
router.get("/google", googleLogin)

// Logout route
router.route("/logout").post(logoutUser)

// Add these new routes after the existing ones:
router.post("/send-otp", sendOTP)
router.post("/verify-otp", verifyOTP)
router.post("/resend-otp", resendOTP)
router.get('/me', isAuthenticated, getProfile);

export default router
