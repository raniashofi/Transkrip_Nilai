'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailMataKuliah extends Model {
    static associate(models) {
      DetailMataKuliah.belongsTo(models.User, { foreignKey: 'nim_nip' });
      DetailMataKuliah.belongsTo(models.MataKuliah, { foreignKey: 'kode_matkul' });
    }
  }
  DetailMataKuliah.init({
    nim_nip: { // Add this field
      type: DataTypes.STRING,
      references: {
        model: 'Users', // name of Target model
        key: 'nim_nip', // key in Target model that we're referencing
      },
    },
    kode_matkul: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'MataKuliahs',
        key: 'kode_matkul',
      }
    },
  }, {
    sequelize,
    modelName: 'DetailMataKuliah',
    tableName: 'DetailMataKuliahs',
    timestamps: true, // Add this line if timestamps are needed
    createdAt: 'createdAt', // Rename createdAt column if necessary
    updatedAt: 'updatedAt', // Rename updatedAt column if necessary
  });
  return DetailMataKuliah;
};
