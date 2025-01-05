const express = require("express");
const { auth, isAdminOrSeller } = require("../middleware/auth");
const { 
    createProduct, 
    getProductById, 
    getAllProducts, 
    updateProduct, 
    deleteProduct, 
    getProductByCategory,
    forYou,
    getProductByUserId
} = require("../controller/Product");

const router = express.Router();

router.post("/createproduct", auth, isAdminOrSeller, createProduct);


router.get("/getproductbyid/:id",  getProductById);


router.get("/getallproducts",  getAllProducts);
router.get("/getallproductsbycategoryid/:categoryId",  getProductByCategory);



router.put("/updateproductbyid/:id", auth, isAdminOrSeller, updateProduct);


router.delete("/deleteproductbyid/:id", auth, isAdminOrSeller, deleteProduct);
router.get("/foryou", forYou)
router.get("/getproductbyuserid",auth, isAdminOrSeller, getProductByUserId)

module.exports = router;
