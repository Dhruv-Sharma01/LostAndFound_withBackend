// routes/userRoutes.js
import express from "express";
import { registerUser, loginUser, updateUser } from "../controllers/User.controller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Update user route
router.put("/users/:userId", updateUser);

export default router;
