const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/protected",
  })
);

// Protected test route
router.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      message: "✅ You are logged in",
      user: req.user,
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
