// routes/userRoutes.js
import express from "express";
import { registerUser, loginUser, updateUser, forgotPassword, resetPassword } from "../controllers/User.controller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Update user route
router.put("/users/:userId", updateUser);

// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route
router.post("/reset-password/:token", resetPassword);

export default router;
