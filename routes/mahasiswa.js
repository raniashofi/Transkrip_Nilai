const express = require("express");
const verifyToken = require("../middleware/validtokenMiddleware.js");
const {
  getUser,
  getProfileMhs,
  changePassword,
} = require("../controllers/auth.js");
const { User, Pengajuan } = require("../models/index");
const upload = require("../middleware/uploadFile");

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

router.get("/pengajuan", verifyToken("mahasiswa"), async (req, res) => {
  try {
    const user = await getUser(req, res);
    res.render("mahasiswa/pengajuan", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(
  "/pengajuan",
  verifyToken("mahasiswa"),
  upload.single("gambar"),
  async (req, res) => {
    try {
      const user = await getUser(req, res);
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      const { alasan } = req.body;
      const gambar = req.file ? req.file.filename : null;
      if (!alasan) {
        return res.status(400).json({ message: "Data tidak lengkap" });
      }

      await Pengajuan.create({
        nim_nip: user.nim_nip,
        alasan: alasan,
        krs_ktm: gambar,
      });

      return res.status(200).json({ message: "Data berhasil diinput" });
    } catch (error) {
      console.error("Error saat membuat pengajuan:", error);
      return res.status(500).json({ message: "Kesalahan Server" });
    }
  }
);

router.get("/notifikasi", verifyToken("mahasiswa"), async (req, res) => {
  try {
    const user = await getUser(req, res);
    res.render("mahasiswa/notifikasi", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/status", verifyToken("mahasiswa"), async (req, res) => {
  try {
    const user = await getUser(req, res);
    const pengajuanlist = await Pengajuan.findAll({
      where: { nim_nip: user.nim_nip },
      include: [User],
    });
    const pengajuanWithPdf = pengajuanlist.map((pengajuan) => {
      if (pengajuan.status === "diterima") {
        const pdfFilename = `transkrip_${pengajuan.User.nim_nip}.pdf`;
        const pdfPath = `/uploads/pdfs/${pdfFilename}`;
        return { ...pengajuan.toJSON(), pdfPath };
      }
      return pengajuan.toJSON();
    });

    res.render("mahasiswa/status", {
      pengajuan: pengajuanWithPdf,
      user: user, // Menggunakan user dari hasil getUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
