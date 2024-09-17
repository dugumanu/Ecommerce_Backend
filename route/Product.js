const express = require("express");
const { auth, isAdminOrSeller } = require("../middleware/auth");
const { 
    createProduct, 
    getProductById, 
    getAllProducts, 
    updateProduct, 
    deleteProduct 
} = require("../controller/Product");

const router = express.Router();

router.post("/createproduct", auth, isAdminOrSeller, createProduct);


router.get("/product/:id",  getProductById);


router.get("/products",  getAllProducts);


router.put("/product/:id", auth, isAdminOrSeller, updateProduct);


router.delete("/product/:id", auth, isAdminOrSeller, deleteProduct);

module.exports = router;
