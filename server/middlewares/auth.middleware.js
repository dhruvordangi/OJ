// middleware/auth.js
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const secret = "jn4k5n6n5nnn6oi4n";

const isAuthenticated = async (req, res, next) => {
    console.log("reached here ->",req.cookies.token);
  
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: "Authentication required" });
        }
        
        const token = req.cookies.token;
        const decoded = jwt.verify(token, secret);
        
        req.user = await User.findById(decoded._id).select("-password");
        console.log("reached step 2");

        if (!req.user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        console.log("Printing the->",req.cookies);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};


export{
    isAuthenticated,
}
