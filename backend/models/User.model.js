// models/User.js
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  fullName: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  uploadedItems: [{
    type: Schema.Types.ObjectId,
    ref: "Item" // Ensure the reference name matches your Item model
  }]
}, {
  timestamps: true
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    fullName: this.fullName,
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" // Default to 15 minutes if not specified
  });
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id,
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" // Default to 7 days if not specified
  });
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);
