'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transkrip, { foreignKey: 'nim_nip' });
      User.hasMany(models.Pengajuan, { foreignKey: 'nim_nip' });
      User.hasMany(models.DetailMataKuliah, { foreignKey: 'nim_nip' });
    }
  }
  User.init({
    nim_nip: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    nama: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    fakultas: {
      type: DataTypes.STRING,
    },
    jurusan: {
      type: DataTypes.STRING,
    },
    dosen_pembimbingAKD: {
      type: DataTypes.STRING,
    },
    dosen_pembimbingTA: {
      type: DataTypes.STRING,
    },
    terdaftar_mulai: {
      type: DataTypes.STRING,
    },
    tempat_lahir: {
      type: DataTypes.STRING,
    },
    tanggal_lahir: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
