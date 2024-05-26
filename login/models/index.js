import Sequelize from "sequelize";
import db from "../config/database.js";
import User from "./User.js";
import MataKuliah from "./MataKuliah.js";
import TahunAjaran from "./TahunAjaran.js";
import Kelas from "./Kelas.js";
import DetailTahunAjar from "./DetailTahunAjar.js";
import Transkrip from "./Transkrip.js";

// Initialize all models
const models = {
  User,
  MataKuliah,
  TahunAjaran,
  Kelas,
  DetailTahunAjar,
  Transkrip
};

// Define associations
User.hasMany(Transkrip, { foreignKey: 'id' });
Transkrip.belongsTo(User, { foreignKey: 'id' });

MataKuliah.hasMany(Transkrip, { foreignKey: 'kode_matkul' });
Transkrip.belongsTo(MataKuliah, { foreignKey: 'kode_matkul' });

TahunAjaran.hasMany(Transkrip, { foreignKey: 'tahun_ajaran' });
Transkrip.belongsTo(TahunAjaran, { foreignKey: 'tahun_ajaran' });

TahunAjaran.hasMany(DetailTahunAjar, { foreignKey: 'tahun_ajaran' });
DetailTahunAjar.belongsTo(TahunAjaran, { foreignKey: 'tahun_ajaran' });

Kelas.hasMany(DetailTahunAjar, { foreignKey: 'kode_kelas' });
DetailTahunAjar.belongsTo(Kelas, { foreignKey: 'kode_kelas' });

export default models;
