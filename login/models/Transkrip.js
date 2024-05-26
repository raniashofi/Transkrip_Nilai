import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./User.js";
import MataKuliah from "./MataKuliah.js";
import TahunAjaran from "./TahunAjaran.js";

const Transkrip = db.define('transkrip', {
  nilai_huruf: {
    type: Sequelize.STRING
  },
  nilai_mutu: {
    type: Sequelize.INTEGER
  },
  id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  kode_matkul: {
    type: Sequelize.STRING,
    references: {
      model: MataKuliah,
      key: 'kode_matkul'
    }
  },
  tahun_ajaran: {
    type: Sequelize.STRING,
    references: {
      model: TahunAjaran,
      key: 'tahun_ajaran'
    }
  }
}, {
  freezeTableName: true
});

export default Transkrip;
