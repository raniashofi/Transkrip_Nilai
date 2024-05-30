const Sequelize = require("sequelize");

const MataKuliah = db.define(
  "mataKuliah",
  {
    kode_matkul: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    nama_matkul: {
      type: Sequelize.STRING,
    },
    sks: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = MataKuliah;
