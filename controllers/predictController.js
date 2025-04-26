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
    const newEntry = new History({
      url,
      result,
      userId,
      deviceId,
    });

    await newEntry.save();
    return res.status(201).json({ message: "History saved successfully" });
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
module.exports = { predictUrl, saveHistory, getAllHistory };
