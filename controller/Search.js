const Category = require("../models/category");
const Product = require("../models/product");

exports.searchByFilter = async (req, res) => {
    try {
        const { q } = req.query;  
        const { category, state, city } = req.body;
        
        console.log("Received Query:", q, "Category:", category, "State:", state, "City:", city); 
        
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
            filter.state = { $regex: state, $options: "i" };  
        }

        
        if (city) {
            filter.city = { $regex: city, $options: "i" };
        }

        console.log("Final Filter Object:", filter);  
        
        
        const products = await Product.find(filter);
        
        // if (products.length === 0) {
        //     return res.json({
        //         success: false,
        //         message: "No products found with the applied filters"
        //     });
        // }

        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error("Error in searchByFilter: ", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};





exports.searchAll = async (req, res) => {
    try {
        const searchFilter = req.query.q;

        if (!searchFilter) {
            return res.status(400).json({
                message: "Search query not found",
                success: false
            });
        }

        const regexSearch = { $regex: searchFilter, $options: "i" };

        
        const categories = await Category.find({
            $or: [
                { name: regexSearch },  
                { description: regexSearch }  
            ]
        });

        
        const categoryIds = categories.map((category) => category._id);

        
        const products = await Product.find({
            $or: [
                { name: regexSearch },  
                { about: regexSearch },  
                { categoryId: { $in: categoryIds } }  
            ]
        }).populate('categoryId', 'name description');  

        
        return res.json({
            success: true,
            products
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
