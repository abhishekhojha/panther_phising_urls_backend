const express = require("express");
const router = express.Router();
const { predictUrl } = require("../controllers/predictController");

// Protected prediction route
router.post("/predict", predictUrl);

module.exports = router;
