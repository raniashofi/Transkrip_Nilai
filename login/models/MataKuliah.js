import { Sequelize } from "sequelize";
import db from "../config/database.js";

const MataKuliah = db.define('mataKuliah', {
  kode_matkul: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING
  },
  nama_matkul: {
    type: Sequelize.STRING
  },
  sks: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true
});

export default MataKuliah;
