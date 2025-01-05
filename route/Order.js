const express = require("express");
const { auth, isAdminOrSeller, isAdmin } = require("../middleware/auth");
const { buyOrder } = require("../controller/Order");
const router = express.Router();
router.post("/buyorder",  auth, buyOrder );


module.exports = router;