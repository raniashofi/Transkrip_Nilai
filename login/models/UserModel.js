import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Users = db.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nama: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  nim_nip: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  fakultas: {
    type: Sequelize.STRING
  },
  jurusan: {
    type: Sequelize.STRING
  },
  dosen_pembimbing: {
    type: Sequelize.STRING
  },
  refresh_token: {
    type: Sequelize.TEXT
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true
});

export default Users;
