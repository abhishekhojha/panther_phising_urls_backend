const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// Load env variables
dotenv.config();

// Passport config
require("./auth/passport");
connectDB();

const authRoutes = require("./routes/authRoutes");
const predictRoutes = require("./routes/predictRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", authRoutes);
app.use("/api", predictRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "🛡️ Node.js API is up and running!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
