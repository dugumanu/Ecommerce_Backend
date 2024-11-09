const express = require("express");
const { auth, isAdminOrSeller, isAdmin } = require("../middleware/auth");
const { createCategory, getCategory, getAllCategory, deleteCategoryById } = require("../controller/Category");
const router = express.Router();
router.post("/createcategory",  auth, isAdmin, createCategory );
router.get("/getcategorybyid/:id", getCategory);
router.get("/getallcategory", getAllCategory);
router.delete(`/deletecategorybyid/:id`,auth,isAdmin,deleteCategoryById)

module.exports = router;