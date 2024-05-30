const Sequelize = require("sequelize");
const TahunAjaran = require("./TahunAjaran.js");
const Kelas = require("./Kelas.js");

const DetailTahunAjar = db.define(
  "detailTahunAjar",
  {
    tahun_ajaran: {
      type: Sequelize.STRING,
      references: {
        model: TahunAjaran,
        key: "tahun_ajaran",
      },
    },
    kode_kelas: {
      type: Sequelize.STRING,
      references: {
        model: Kelas,
        key: "kode_kelas",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = DetailTahunAjar;
