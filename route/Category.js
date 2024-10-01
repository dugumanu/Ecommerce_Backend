const express = require("express");
const { auth, isAdminOrSeller } = require("../middleware/auth");
const { createCategory, getCategory, getAllCategory } = require("../controller/Category");
const router = express.Router();
router.post("/createcategory",  auth, isAdminOrSeller, createCategory );
router.get("/getcategorybyid/:id", getCategory);
router.get("/getallcategory", getAllCategory);

module.exports = router;