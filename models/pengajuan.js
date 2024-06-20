'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengajuan extends Model {
    static associate(models) {
      Pengajuan.belongsTo(models.User, { foreignKey: 'nim_nip' });
      Pengajuan.hasMany(models.Notifikasi, { foreignKey: 'idPengajuan' });
    }
  }
  Pengajuan.init({
    idPengajuan: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    alasan: {
      type: DataTypes.TEXT,
    },
    krs_ktm: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["diproses", "ditolak", "diterima"],
    },
    nim_nip: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'nim_nip'
      }
    }
  }, {
    sequelize,
    modelName: 'Pengajuan',
    timestamps: true,
  });
  return Pengajuan;
};
