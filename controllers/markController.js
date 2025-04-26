const History = require("../models/History");

const markSafe = async (req, res) => {
  try {
    const { url, deviceId, userId } = req.body;

    if (!url || !deviceId) {
      return res.status(400).json({ error: "url and deviceId are required" });
    }

    // Check if an entry already exists
    const existingEntry = await History.findOne({ url, deviceId });

    if (existingEntry) {
      // Update the result
      existingEntry.result = "Safe";
      existingEntry.userId = userId || existingEntry.userId; // Update userId if provided
      await existingEntry.save();

      console.log(`📝 Updated existing entry to SAFE: ${url}`);
    } else {
      // Create new entry
      const newEntry = new History({
        url,
        result: "Safe",
        userId: userId || null,
        deviceId,
      });

      await newEntry.save();

      console.log(`🆕 Created new SAFE entry: ${url}`);
    }

    res.status(200).json({ message: "✅ URL marked as safe" });
  } catch (error) {
    console.error("Error in markSafe:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const markSpam = async (req, res) => {
  try {
    const { url, deviceId, userId } = req.body;

    if (!url || !deviceId) {
      return res.status(400).json({ error: "url and deviceId are required" });
    }

    const existingEntry = await History.findOne({ url, deviceId });

    if (existingEntry) {
      existingEntry.result = "Risky";
      existingEntry.userId = userId || existingEntry.userId;
      await existingEntry.save();

      console.log(`📝 Updated existing entry to SPAM: ${url}`);
    } else {
      const newEntry = new History({
        url,
        result: "Risky",
        userId: userId || null,
        deviceId,
      });

      await newEntry.save();

      console.log(`🆕 Created new SPAM entry: ${url}`);
    }

    res.status(200).json({ message: "✅ URL marked as spam" });
  } catch (error) {
    console.error("Error in markSpam:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { markSafe, markSpam };
