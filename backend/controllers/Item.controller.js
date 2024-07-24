// controllers/itemController.js
import { Item } from "../models/Item.model.js";

// Add a new item
export const addItem = async (req, res) => {
  try {
    const { itemName, dateFound, placeFound, foundBy,phoneNo } = req.body;
    
    // Ensure all required fields are present
    if (!itemName || !dateFound || !placeFound || !foundBy) {
      console.log(req.body);
      return res.status(404).json({ error: 'All fields are required' });
    }

    const newItem = new Item({
      itemName,
      dateFound,
      placeFound,
      foundBy,
      phoneNo
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.log(req.body);
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};


// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("foundBy", "username email");
    res.status(200).json({ items });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get a single item by ID
export const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.status(200).json({ item });
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update an item by ID
export const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { itemName, dateFound, placeFound, itemImage } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { itemName, dateFound, placeFound, itemImage },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.status(200).json({ item: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
