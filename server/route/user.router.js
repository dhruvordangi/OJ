import express from "express";
const router = express.Router();
import { upload } from "../middlewares/multer.middleware.js";
import { signup, login, googleLogin, logoutUser } from "../Controller/user.controller.js";

router.route("/signup").post(upload.single("profilePic"),signup);
router.post("/login",login);
router.get("/google", googleLogin);

router.route("/logout").post(logoutUser);

export default router;