const express = require("express");
const { Login, Logout } = require("../controllers/auth.js");
const router = express.Router();

router.post("/login", Login);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
