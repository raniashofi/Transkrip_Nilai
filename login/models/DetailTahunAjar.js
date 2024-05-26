import { Sequelize } from "sequelize";
import db from "../config/database.js";
import TahunAjaran from "./TahunAjaran.js";
import Kelas from "./Kelas.js";

const DetailTahunAjar = db.define('detailTahunAjar', {
  tahun_ajaran: {
    type: Sequelize.STRING,
    references: {
      model: TahunAjaran,
      key: 'tahun_ajaran'
    }
  },
  kode_kelas: {
    type: Sequelize.STRING,
    references: {
      model: Kelas,
      key: 'kode_kelas'
    }
  }
}, {
  freezeTableName: true
});

export default DetailTahunAjar;
