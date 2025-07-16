import express from "express";
const router = express.Router()
import otpController from "../Controller/otp.controller.js"

router.post("/send-otp", otpController.sendOtp)
router.post("/verify-otp", otpController.verifyOtp)

export default router;