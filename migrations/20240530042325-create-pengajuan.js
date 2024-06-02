'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pengajuans', {
      idPengajuan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nim_nip: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'nim_nip'
        }
      },
      alasan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      krs_ktm: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("diproses", "ditolak", "diterima"),
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
    await queryInterface.dropTable('Pengajuans');
  }
};