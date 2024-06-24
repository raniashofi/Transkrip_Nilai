const { User, Pengajuan } = require("../models/index");
const { getUser, getProfileMhs, changePassword } = require("./auth.js");

exports.getNotif = async (req, res) => {
    try {
      const user = await getUser(req, res);
      const listPengajuan = await Pengajuan.findAll({
        where: {
          status: ["diterima", "ditolak"],
          nim_nip: user.nim_nip,
        },
        include: [
          {
            model: User,
            attributes: ["nama", "email", "fakultas", "jurusan"],
          },
        ],
      });
  
      res.render("mahasiswa/notifikasi", { user, listPengajuan });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.getHome = async (req, res) => {
    try {
      const user = await getUser(req, res);
      res.render("mahasiswa/home", { user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  exports.getProfile = async (req, res) => {
    try {
      const user = await getProfileMhs(req, res);
      res.render("mahasiswa/profile", { user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  exports.getChangePass = async (req, res) => {
    try {
      const user = await getUser(req, res);
      res.render("mahasiswa/changePass", { user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  exports.postChangePass = async (req, res) => {
    await changePassword(req, res);
  };
  
  exports.getPengajuan = async (req, res) => {
    try {
      const user = await getUser(req, res);
      res.render("mahasiswa/pengajuan", { user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  exports.postPengajuan = async (req, res) => {
    try {
      const user = await getUser(req, res);
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
  
      const { alasan } = req.body;
      const gambar = req.file ? req.file.filename : null;
      if (!alasan || !gambar) {
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
  };
  
  exports.getStatus = async (req, res) => {
    try {
      const user = await getUser(req, res);
      const pengajuanlist = await Pengajuan.findAll({
        where: { nim_nip: user.nim_nip },
        include: [User],
        order: [['createdAt', 'DESC']],
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
        user: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };