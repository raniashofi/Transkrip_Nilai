'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TahunAjaran extends Model {
    static associate(models) {
      TahunAjaran.hasMany(models.Transkrip, { foreignKey: 'tahun_ajaran' });
    }
  }
  TahunAjaran.init({
    tahun_ajaran: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'TahunAjaran',
  });
  return TahunAjaran;
};
