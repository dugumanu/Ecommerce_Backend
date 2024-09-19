const Category = require("../models/category");
const Product = require("../models/product");
const { uploadToCloudinary } = require("../utils/uploader"); 

exports.createProduct = async (req, res) => {
    try {
        const { categoryId, name, about, originalPrice, price, sellerId, state,city } = req.body;

        
        if (!name || !originalPrice || !price || !sellerId || !categoryId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        
        const discount = ((originalPrice - price) * 100) / originalPrice;

        
        const files = req.files.images; 
    let uploadedImages = [];
    if (files && files.length > 0) {
      for (let file of files) {
        const result = await uploadToCloudinary(file, 'products');
        uploadedImages.push(result.secure_url);
      }
    }

        
        const newProduct = new Product({
            name,
            categoryId,
            about,
            price,
            sellerId,
            originalPrice,
            discount: discount,
            image: uploadedImages,
            state,
            city
        });

        
        await newProduct.save();

        
        await Category.findByIdAndUpdate(categoryId, { $push: { products: newProduct._id } });

        
        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product: newProduct
        });

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('categoryId').populate('sellerId');
        
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId').populate('sellerId');
        
        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, about, price, originalPrice, categoryId, sellerId } = req.body;
        
        const files = req.files;
        const images = [];
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const uploadedImage = await uploadToCloudinary(files[i], "Ecommerce");
                if (uploadedImage && uploadedImage.secure_url) {
                    images.push(uploadedImage.secure_url);
                }
            }
        }

        const discount = ((originalPrice - price) * 100) / originalPrice;

        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            about,
            price,
            originalPrice,
            categoryId,
            sellerId,
            discount: discount,
            ...(images.length && { images }) // Only update images if new ones are provided
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product: updatedProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};
