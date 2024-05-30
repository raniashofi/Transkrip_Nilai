const Sequelize = require("sequelize");

const TahunAjaran = db.define(
  "tahunAjaran",
  {
    tahun_ajaran: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = TahunAjaran;
