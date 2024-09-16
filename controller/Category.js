const Category = require("../models/category");

exports.createCategory = async (req, res) => {
    try {
        const {name , description} = req.body;
        if(!name  || !description) return res.status(401).json({
            success: false,
            message : "All field are required"
        })

        const existingCategory = await Category.find({name : name});
        if(existingCategory) return res.status(409).json({
            success:false,
            message: "Already existing category can't create"
        })

        const newCategory = new Category({
            name,
            description
        })

        await newCategory.save();
        return res.status(200).json({
            success:true,
            message : "Category created successfully"
        })
    } catch (error) {
        console.log("Error in category creation ", error);
        return res.status(400).jsoN({
            message : false,
            message : "Category creation failed",
            error : message.error
        })
    }
}
