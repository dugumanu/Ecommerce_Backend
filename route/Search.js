const express = require("express");
const { searchByFilter } = require("../controller/Search");

const router = express.Router();
router.post("/searchbyfilter",  searchByFilter );


module.exports = router;