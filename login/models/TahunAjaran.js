import { Sequelize } from "sequelize";
import db from "../config/database.js";

const TahunAjaran = db.define('tahunAjaran', {
  tahun_ajaran: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
});

export default TahunAjaran;
