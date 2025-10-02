// controllers/userController.js
import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
// Note: jwt is no longer needed here

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    
    // IMPORTANT: Check if username already exists to prevent database error
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
        return res.status(400).json({ message: "Username is already taken." });
    }

    // Create a new user
    const newUser = new User({
      username,
      fullName,
      email,
      password, // Will be hashed by the pre-save hook
    });

    await newUser.save();

    // Simply return the newly created user object, no tokens
    res.status(201).json({
      user: {
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Simply return the user details, no tokens
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// NOTE: The other functions like updateUser, forgotPassword, etc., do not need changes for this fix.
