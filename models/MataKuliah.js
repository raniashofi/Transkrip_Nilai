'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MataKuliah extends Model {
    static associate(models) {
      MataKuliah.hasMany(models.Transkrip, { foreignKey: 'kode_matkul' });
      MataKuliah.hasMany(models.DetailMataKuliah, { foreignKey: 'kode_matkul' });
    }
  }
  MataKuliah.init({
    kode_matkul: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    nama_matkul: {
      type: DataTypes.STRING,
    },
    sks: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'MataKuliah',
  });
  return MataKuliah;
};
