'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailMataKuliahs', {
      nim_nip: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'nim_nip'
        }
      },
      kode_matkul: {
        type: Sequelize.STRING,
        references: {
          model: 'MataKuliahs',
          key: 'kode_matkul'
        }
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
    await queryInterface.dropTable('DetailMataKuliahs');
  }
};