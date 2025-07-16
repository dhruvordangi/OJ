import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true, // ✅ Fixed `require` to `required`
    },
    email: {
        type: String,
        required: true,
        unique: true, // ✅ Ensures no duplicate emails
    },
    role: {
        type: String,
        required: true,
        default: "user", // ✅ Sets default role
    },
    password: {
        type: String,
        required: true,
    },
    profilePic:{
            type: String,
            required: false,
        },
    location: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // ✅ Fixed spelling error

export const User = mongoose.model("User", userSchema);
