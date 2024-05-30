const express = require("express");
const verifyToken = require("../middleware/validtokenMiddleware.js");
const {
  getUser,
  getProfileMhs,
  changePassword,
} = require("../controllers/auth.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/mahasiswa/home");
});

router.get("/home", verifyToken("mahasiswa"), async (req, res) => {
  try {
    const user = await getUser(req, res);
    res.render("mahasiswa/home", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/profile", verifyToken("mahasiswa"), async (req, res) => {
  try {
    const user = await getProfileMhs(req, res);
    res.render("mahasiswa/profile", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get(
  "/profile/changePass",
  verifyToken("mahasiswa"),
  async function (req, res) {
    const user = await getUser(req, res);
    res.render("mahasiswa/changePass", { user });
  }
);

router.post("/changePass", verifyToken("mahasiswa"), async (req, res) => {
  await changePassword(req, res);
});

module.exports = router;
