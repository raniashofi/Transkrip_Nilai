'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mataKuliah', {
      kode_matkul: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_matkul: {
        type: Sequelize.STRING
      },
      sks: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mataKuliah');
  }
};
