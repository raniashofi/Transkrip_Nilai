'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kelas', {
      kode_kelas: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_kelas: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kelas');
  }
};
