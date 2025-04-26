const express = require("express");
const router = express.Router();
const { markSafe, markSpam } = require("../controllers/markController");

router.post("/mark-safe", markSafe);
router.post("/mark-spam", markSpam);

module.exports = router;
