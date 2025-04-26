const express = require("express");
const router = express.Router();
const {
  predictUrl,
  saveHistory,
  getAllHistory,
  getHistoryByDevice,
} = require("../controllers/predictController");
const History = require("../models/History");

// Protected prediction route
router.post("/predict", predictUrl);
router.post("/save-history", saveHistory);
router.get("/history", getAllHistory);
router.get("/history/:deviceId", getHistoryByDevice);
// router.get("/delete-console-urls", async (req, res) => {
//   try {
//     // Delete all URLs starting with 'https://console.cloud.google.com'
//     const result = await History.deleteMany({
//       url: { $regex: "^https://console\\.cloud\\.google\\.com", $options: "i" },
//     });

//     if (result.deletedCount > 0) {
//       res
//         .status(200)
//         .json({
//           message: `${result.deletedCount} URL(s) deleted successfully`,
//         });
//     } else {
//       res.status(404).json({ message: "No matching URLs found" });
//     }
//   } catch (err) {
//     console.error("Error deleting URLs:", err);
//     res
//       .status(500)
//       .json({ error: "Failed to delete URLs", details: err.message });
//   }
// });
module.exports = router;
