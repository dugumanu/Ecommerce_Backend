const express = require("express");
const { searchByFilter, searchAll } = require("../controller/Search");

const router = express.Router();
router.post("/searchbyfilter",  searchByFilter );
router.post("/searchall",  searchAll );



module.exports = router;