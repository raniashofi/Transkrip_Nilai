const express = require("express");
const verifyToken = require("../middleware/validtokenMiddleware.js");
const {
  getUser,
  getProfile,
} = require("../controllers/auth.js");
const { getListPengajuan,getListDitolak,getListDisetujui,getHistory,searchHistory } = require("../controllers/admin.js");
const { Pengajuan, User, Transkrip, MataKuliah } = require("../models/index");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const libre = require("libreoffice-convert");

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

router.get("/listPengajuan", verifyToken("admin"), getListPengajuan);
router.get("/historyAdmin", verifyToken("admin"), getHistory);
router.get("/searchHistory", verifyToken("admin"), searchHistory);
router.get("/listDitolak", verifyToken("admin"), getListDitolak);
router.get("/listDisetujui", verifyToken("admin"), getListDisetujui);



router.get("/pengelolaan", verifyToken("admin"), async (req, res) => {

  try {
    const user = await getUser(req, res);

    // Hitung jumlah pengajuan berdasarkan status
    const countDiproses = await Pengajuan.count({
      where: { status: "diproses" },
    });
    const countDiterima = await Pengajuan.count({
      where: { status: "diterima" },
    });
    const countDitolak = await Pengajuan.count({
      where: { status: "ditolak" },
    });

    res.render("admin/pengelolaan", {
      user,
      countDiproses,
      countDiterima,
      countDitolak,
    });
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



router.post("/setuju", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.body;
    const pengajuan = await Pengajuan.findByPk(id, {
      include: [
        {
          model: User,
          include: [
            {
              model: Transkrip,
              include: [MataKuliah],
            },
          ],
        },
      ],
    });

    if (pengajuan) {
      pengajuan.status = "diterima";
      await pengajuan.save();

      // Load DOCX template
      const templatePath = path.resolve(
        "public/template",
        "template-transkrip.docx"
      );
      const content = fs.readFileSync(templatePath);
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const user = pengajuan.User;
      const transkripData = user.Transkrips.map((transkrip, index) => ({
        no: index + 1,
        mata_kuliah: transkrip.MataKuliah.nama_matkul,
        sks: transkrip.MataKuliah.sks,
        nilai_huruf: transkrip.nilai_huruf || "BL",
        nilai_mutu: transkrip.nilai_mutu || 0,
      }));

      const jumlahSKS = transkripData.reduce((sum, item) => sum + item.sks, 0);
      const jumlahMutu = transkripData.reduce(
        (sum, item) => sum + item.nilai_mutu,
        0
      );
      const nilaiDCount = transkripData.filter(
        (item) => item.nilai_huruf === "D"
      ).length;
      const IPK = (jumlahMutu / jumlahSKS).toFixed(2);

      doc.setData({
        nama: user.nama,
        nim_nip: user.nim_nip,
        terdaftar_mulai: user.terdaftar_mulai,
        jurusan: user.jurusan,
        tempat_lahir: user.tempat_lahir,
        tanggal_lahir: user.tanggal_lahir,
        lulus_sarjana: user.lulus_sarjana || 0,
        nomor_ijazah: user.nomor_ijazah || "",
        jumlah_sks: jumlahSKS,
        jumlah_mutu: jumlahMutu,
        IPK: IPK,
        jumlah_nilai_huruf_D: nilaiDCount,
        CreatedAt: new Date().toLocaleDateString(),
        transkripData: transkripData,
        dosen_pembimbingTA: user.dosen_pembimbingTA,
        dosen_pembimbingAKD: user.dosen_pembimbingAKD,
        nip_dosenAKD: user.nip_dosenAKD,
      });

      doc.render();

      const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });

      const uploadsDir = path.join(__dirname, "../uploads");
      const pdfsDir = path.join(uploadsDir, "pdfs");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      if (!fs.existsSync(pdfsDir)) {
        fs.mkdirSync(pdfsDir, { recursive: true });
      }

      const timestamp = Date.now();
      const docxFileName = `transkrip_${user.nim_nip}_${timestamp}.docx`;
      const docxFilePath = path.join(pdfsDir, docxFileName);
      fs.writeFileSync(docxFilePath, buf);

      const pdfFileName = `transkrip_${user.nim_nip}_${timestamp}.pdf`;
      const pdfFilePath = path.join(pdfsDir, pdfFileName);

      const file = fs.readFileSync(docxFilePath);
      libre.convert(file, ".pdf", undefined, (err, done) => {
        if (err) {
          console.error(`Error converting file: ${err}`);
          return res.status(500).send("Error converting file");
        }

        fs.writeFileSync(pdfFilePath, done);

        fs.unlinkSync(docxFilePath);

        pengajuan.file_transkrip = pdfFileName;
        pengajuan.save().then(() => {
          res.redirect("back");
        });
      });
    }
  } catch (error) {
    console.error("Error approving pengajuan:", error);
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
