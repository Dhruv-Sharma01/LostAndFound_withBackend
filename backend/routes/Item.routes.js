// routes/itemRoutes.js
import express from "express";
import { addItem, getItems, getItemById, updateItem, deleteItem } from "../controllers/Item.controller.js";

const router = express.Router();

// Add item route
router.post("/items", addItem);

// Get all items route
router.get("/items", getItems);

// Get item by ID route
router.get("/items/:itemId", getItemById);

// Update item by ID route
router.put("/items/:itemId", updateItem);

// Delete item by ID route
router.delete("/items/:itemId", deleteItem);

export default router;
