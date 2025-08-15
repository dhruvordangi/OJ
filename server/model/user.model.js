import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema({
    problem: {
        type: Schema.Types.ObjectId,
        ref: "Problem", // Reference to the Problem model
        required: true,
    },
    code: {
        type: String, // Store user’s submitted code
        required: true,
    },
    status: {
        type: String,
        enum: ["Success", "Failed"],
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    }
});

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    submissions: [submissionSchema] // Add submissions array
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
