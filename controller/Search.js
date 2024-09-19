const Category = require("../models/category");
const Product = require("../models/product");

exports.searchByFilter = async (req, res) => {
    try {
        const { q } = req.query;  
        const { category, state, city } = req.body; 
        
        
        if (!q) {
            return res.json({
                success: false,
                message: "Keyword not found"
            });
        }

        
        const filter = {
            name: { $regex: q, $options: "i" }  
        };

        if (category) {
            const categoryDoc = await Category.findOne({ name: { $regex: category, $options: "i" } });
            if (!categoryDoc) {
                return res.json({
                    success: false,
                    message: "Category not found"
                });
            }
            filter.categoryId = categoryDoc._id;  
        }

        if (state) {
            filter.state = state;  
        }

        if (city) {
            filter.city = city;
        }

        
        const products = await Product.find(filter);
        
        
        res.json({
            success: true,
            products
        });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
