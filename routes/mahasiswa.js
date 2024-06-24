const express = require("express");
const verifyToken = require("../middleware/validtokenMiddleware.js");
const {
  getNotif,
  getHome,
  getProfile,
  getChangePass,
  postChangePass,
  getPengajuan,
  postPengajuan,
  getStatus,
} = require("../controllers/Users.js");
const upload = require("../middleware/uploadFile");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/mahasiswa/home");
});

router.get("/notifikasi", verifyToken("mahasiswa"), getNotif);

router.get("/home", verifyToken("mahasiswa"), getHome);

router.get("/profile", verifyToken("mahasiswa"), getProfile);

router.get("/profile/changePass", verifyToken("mahasiswa"), getChangePass);

router.post("/changePass", verifyToken("mahasiswa"), postChangePass);

router.get("/pengajuan", verifyToken("mahasiswa"), getPengajuan);

router.post("/pengajuan", verifyToken("mahasiswa"), upload.single("gambar"), postPengajuan);

router.get("/status", verifyToken("mahasiswa"), getStatus);

module.exports = router;
