// controllers/userController.js
import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Create a new user
    const newUser = new User({
      username,
      fullName,
      email,
      password, // Will be hashed by the pre-save hook
    });

    await newUser.save();

    // Generate tokens
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    // Return the newly created user with tokens
    res.status(201).json({
      user: {
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const {email,password}=req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log(email);
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(password,user.password)
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Return the tokens and user details
    res.status(200).json({
      user: {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        id:user._id
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, fullName, email } = req.body;

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, fullName, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      user: {
        username: updatedUser.username,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
      }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
