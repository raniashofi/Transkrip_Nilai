const Sequelize = require("sequelize");

const Kelas = db.define(
  "kelas",
  {
    kode_kelas: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    nama_kelas: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Kelas;
