const express = require("express");
const { auth, isAdminOrSeller, isAdmin } = require("../middleware/auth");
const { buyOrder, myOrder, sellerOrder, orderStatus } = require("../controller/Order");
const router = express.Router();
router.post("/buyorder",  auth, buyOrder );
router.get("/myorder",auth,myOrder);
router.get("/sellerorder",auth,isAdminOrSeller,sellerOrder);
router.post("/changeorderstatus",auth,orderStatus);




module.exports = router;