const { getUser } = require("../controllers/auth.js");
const { Op } = require('sequelize');
const { User, Pengajuan } = require("../models/index");

exports.getListPengajuan = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const listPengajuan = await Pengajuan.findAll({
      include: [
        {
          model: User,
          attributes: ["nama", "email", "fakultas", "jurusan"],
        }, 
      ],
    });

    res.render("admin/listPengajuan", { user, listPengajuan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getNotif = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const listPengajuan = await Pengajuan.findAll({
      where : { 
        status : ['diterima', 'ditolak'], 
        nim_nip : user.nim_nip
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

exports.getHistory = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const listPengajuan = await Pengajuan.findAll({
      where: {
        status: ['diterima', 'ditolak'],  
      },
      include: [
        {
          model: User,
          attributes: ["nama", "email", "fakultas", "jurusan"],
        }, 
      ],
    });

    res.render("admin/historyAdmin", { user, listPengajuan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.searchHistory = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const { query } = req.query; // Get the search query from the request

    const listPengajuan = await Pengajuan.findAll({
      where: {
        status: ['diterima', 'ditolak'],
        [Op.or]: [
          {
            '$User.nama$': {
              [Op.like]: `%${query}%`
            }
          },
          {
            status: {
              [Op.like]: `%${query}%`
            }
          },
          {
            alasan: {
              [Op.like]: `%${query}%`
            }
          }
        ]
      },
      include: [
        {
          model: User,
          attributes: ["nama", "email", "fakultas", "jurusan"],
        }
      ],
    });

    res.json({ user, listPengajuan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getListDitolak = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const listPengajuanDitolak = await Pengajuan.findAll({
      where: { status: "ditolak" },
      include: [
        {
          model: User,
          attributes: ["nama", "email", "fakultas", "jurusan"],
        },
      ],
    });

    res.render("admin/listDitolak", { user, listPengajuan: listPengajuanDitolak });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getListDisetujui = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const listPengajuandisetujui = await Pengajuan.findAll({
      where: { status: "diterima" },
      include: [
        {
          model: User,
          attributes: ["nama", "email", "fakultas", "jurusan"],
        },
      ],
    });

    res.render("admin/listDisetujui", { user, listPengajuan: listPengajuandisetujui });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



