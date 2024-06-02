'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    static associate(models) {
      Notifikasi.belongsTo(models.Pengajuan, { foreignKey: 'idPengajuan' });
    }
  }
  Notifikasi.init({
    idNotif: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    idPengajuan: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Pengajuans',
        key: 'idPengajuan'
      }
    },
    alasan: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Notifikasi',
  });
  return Notifikasi;
};
