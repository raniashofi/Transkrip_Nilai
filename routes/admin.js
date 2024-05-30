const express = require("express");
const verifyToken = require("../middleware/validtokenMiddleware.js");
const {
  getUser,
  getProfile,
  changePassword,
} = require("../controllers/auth.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", verifyToken("admin"), async (req, res) => {
  try {
    const user = await getUser(req, res);
    res.render("admin/dashboard", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get(
  "/profile",
  verifyToken("admin"),
  (req, res, next) => {
    console.log("Rute profil admin dipanggil");
    next();
  },
  getProfile
);

module.exports = router;
