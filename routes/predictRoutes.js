const express = require("express");
const router = express.Router();
const { predictUrl, saveHistory,getAllHistory } = require("../controllers/predictController");

// Protected prediction route
router.post("/predict", predictUrl);
router.post("/save-history", saveHistory);
router.get("/history", getAllHistory)
module.exports = router;
