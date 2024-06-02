'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MataKuliahs', {
      kode_matkul: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_matkul: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sks: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MataKuliahs');
  }
};