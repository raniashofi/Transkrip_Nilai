'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transkrip extends Model {
    static associate(models) {
      Transkrip.belongsTo(models.User, { foreignKey: 'nim_nip' });
      Transkrip.belongsTo(models.MataKuliah, { foreignKey: 'kode_matkul' });
      Transkrip.belongsTo(models.TahunAjaran, { foreignKey: 'tahun_ajaran' });
    }
  }
  Transkrip.init({
    nilai_huruf: {
      type: DataTypes.STRING,
    },
    nilai_mutu: {
      type: DataTypes.FLOAT,
    },
    nim_nip: { // Add this field
      type: DataTypes.STRING,
      references: {
        model: 'Users', // name of Target model
        key: 'nim_nip', // key in Target model that we're referencing
      },
    },
    kode_matkul: {
      type: DataTypes.STRING,
      references: {
        model: 'MataKuliahs', // name of Target model
        key: 'kode_matkul', // key in Target model that we're referencing
      },
    },
    tahun_ajaran: {
      type: DataTypes.STRING,
    },
  },
   {
    sequelize,
    modelName: 'Transkrip',
    
  });
  return Transkrip;
};
