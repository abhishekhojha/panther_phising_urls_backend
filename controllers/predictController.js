const axios = require("axios");
const History = require("../models/History");

const predictUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.post("http://localhost:5000/predict", { url });
    res.json(response.data);
  } catch (error) {
    console.error("Prediction API Error:", error.message);
    res.status(500).json({ error: "Prediction service unavailable" });
  }
};
const saveHistory = async (req, res) => {
  const { url, result, userId, deviceId } = req.body;

  if (!url || !result) {
    return res.status(400).json({ error: "URL and result are required" });
  }

  if (!userId && !deviceId) {
    return res.status(400).json({ error: "User ID or Device ID is required" });
  }

  try {
    // Build match condition
    const matchCondition = {
      url,
      $or: [{ userId: userId || null }, { deviceId: deviceId || null }],
    };

    const existingEntry = await History.findOne(matchCondition);

    if (existingEntry) {
      // Update the existing record
      existingEntry.result = result;
      if (userId) existingEntry.userId = userId;
      if (deviceId) existingEntry.deviceId = deviceId;

      await existingEntry.save();
      return res.status(200).json({ message: "History updated successfully" });
    } else {
      // Create a new record
      const newEntry = new History({
        url,
        result,
        userId,
        deviceId,
      });

      await newEntry.save();
      return res.status(201).json({ message: "History saved successfully" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to save history", details: err.message });
  }
};
const getAllHistory = async (req, res) => {
  try {
    const history = await History.find();
    res.status(200).json(history);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch phishing history", details: err });
  }
};
const getHistoryByDevice = async (req, res) => {
  const { deviceId } = req.params; // Get deviceId from the URL

  try {
    // Find phishing history for a specific device
    const history = await History.find({ deviceId });

    if (history.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this device" });
    }

    // Send the response with the device-specific history
    res.status(200).json(history);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch history for this device", details: err });
  }
};
module.exports = { predictUrl, saveHistory, getAllHistory, getHistoryByDevice };
