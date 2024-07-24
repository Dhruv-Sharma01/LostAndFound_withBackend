// models/Item.js
import mongoose, { Schema } from "mongoose";

// Define the item schema
const ItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    lowercase: true,
  },
  dateFound: {
    type: Date,
    required: true,
  },
  placeFound: {
    type: String,
    required: true,
    lowercase: true,
  },
  // itemImage: {
  //   type: String,
  //   required: true,
  // },
  foundBy: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },

}, {
  timestamps: true
});

// Create and export the Item model
export const Item = mongoose.model("Item", ItemSchema);
