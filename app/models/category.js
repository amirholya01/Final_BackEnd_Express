/**
 * MongoDB schema and model for the Category entity.
 * @module CategoryModel
 * @requires mongoose
 */

// Import the mongoose module for MongoDB interaction
const mongoose = require("mongoose");

// Define the schema for the Category entity
const CategorySchema = new mongoose.Schema({
    // Title of the category
    title: { type: String, required: true },
    // Parent category ID (reference to Category entity)
    parent: { type: mongoose.Types.ObjectId, ref: "category", default: undefined }
});

// Create and export the CategoryModel using the CategorySchema
module.exports = {
    CategoryModel: mongoose.model("category", CategorySchema)
};
