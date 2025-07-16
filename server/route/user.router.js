import express from "express";
import {signup,login, googleLogin, logoutUser} from "../Controller/user.controller.js"; 
import { upload } from "../middlewares/multer.middleware.js";
const router=express.Router();

router.route("/signup").post(upload.single("profilePic"),signup);
router.post("/login",login);
router.get("/google", googleLogin);
// router.route('/header').get(isAuthenticated,header);
router.route("/logout").post(logoutUser);

export default router;