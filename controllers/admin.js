const { getUser } = require("../controllers/auth.js");
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


