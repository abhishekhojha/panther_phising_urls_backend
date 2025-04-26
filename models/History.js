const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  url: { type: String, required: true },
  result: { type: String, required: true },
  userId: { type: String },
  deviceId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("History", historySchema);
