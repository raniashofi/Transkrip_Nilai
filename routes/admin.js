const express = require("express");
const verifyToken = require("../middleware/validtokenMiddleware.js");
const {
  getUser,
  getProfile,
} = require("../controllers/auth.js");
const { getListPengajuan } = require("../controllers/admin.js");
const { Pengajuan, User, Transkrip } = require("../models/index");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

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

router.get('/pengelolaan', verifyToken('admin'), async (req, res) => {
  try {
    const user = await getUser(req, res);

    // Hitung jumlah pengajuan berdasarkan status
    const countDiproses = await Pengajuan.count({ where: { status: 'diproses' } });
    const countDiterima = await Pengajuan.count({ where: { status: 'diterima' } });
    const countDitolak = await Pengajuan.count({ where: { status: 'ditolak' } });

    res.render('admin/pengelolaan', {
      user,
      countDiproses,
      countDiterima,
      countDitolak
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get("/listPengajuan", verifyToken("admin"), getListPengajuan);

router.post("/setuju", async (req, res) => {
  try {
    const { id } = req.body;
    const pengajuan = await Pengajuan.findByPk(id, {
      include: [
        {
          model: User,
          include: [Transkrip],
        },
      ],
    });

    if (pengajuan) {
      // Update status to 'diterima'
      pengajuan.status = "diterima";
      await pengajuan.save();

      // Generate PDF
      const uploadsDir = path.join(__dirname, "../uploads");
      const pdfsDir = path.join(uploadsDir, "pdfs");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      if (!fs.existsSync(pdfsDir)) {
        fs.mkdirSync(pdfsDir, { recursive: true });
      }
      const timestamp = Date.now();

      const pdfPath = path.join(
        pdfsDir,
        `transkrip_${pengajuan.User.nim_nip}_${timestamp}.pdf`
      );
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));

      doc.fontSize(20).text("Transkrip Nilai", { align: "center" });
      doc.fontSize(16).text(`Nama: ${pengajuan.User.nama}`, { align: "left" });
      doc
        .fontSize(16)
        .text(`NIM: ${pengajuan.User.nim_nip}`, { align: "left" });

      // Add grades to PDF
      doc.moveDown();
      doc.text("Daftar Nilai:", { align: "left" });
      pengajuan.User.Transkrips.forEach((transkrip) => {
        doc.text(`${transkrip.kode_matkul}: ${transkrip.nilai_huruf}`, {
          align: "left",
        });
      });

      doc.end();

      res.redirect("back"); // Adjust the redirect path as necessary
    } else {
      res.status(404).send("Pengajuan tidak ditemukan");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Terjadi kesalahan");
  }
});

// Route to reject pengajuan
router.post("/tolak", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.body;
    const pengajuan = await Pengajuan.findByPk(id);
    if (pengajuan) {
      pengajuan.status = "ditolak";
      await pengajuan.save();
      res.redirect("back"); // Redirect back to the previous page
    } else {
      res.status(404).send("Pengajuan tidak ditemukan");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Terjadi kesalahan");
  }
});

module.exports = router;
