import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Kelas = db.define('kelas', {
  kode_kelas: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING
  },
  nama_kelas: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
});

export default Kelas;
