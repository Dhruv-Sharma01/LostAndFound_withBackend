// models/User.js
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from 'crypto'; // Keep for password reset

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
  // This password reset logic is separate from JWT and can remain
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  uploadedItems: [{
    type: Schema.Types.ObjectId,
    ref: "Item"
  }]
}, {
  timestamps: true
});

// Pre-save hook to hash the password before saving (IMPORTANT FOR SECURITY)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);
