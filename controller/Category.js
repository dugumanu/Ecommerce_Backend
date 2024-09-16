const Category = require("../models/category");


exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        
        const existingCategory = await Category.findOne({ name: name });
        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists, can't create"
            });
        }

        
        const newCategory = new Category({
            name,
            description
        });

        await newCategory.save();

        return res.status(200).json({
            success: true,
            message: "Category created successfully",
            category: newCategory
        });
    } catch (error) {
        console.log("Error in category creation:", error);
        return res.status(500).json({
            success: false,
            message: "Category creation failed",
            error: error.message
        });
    }
};


exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            category: category
        });
    } catch (error) {
        console.log("Error in category fetching by id:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch category",
            error: error.message
        });
    }
};


exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        
        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            categories: categories
        });
    } catch (error) {
        console.log("Error in fetching all categories:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message
        });
    }
};
