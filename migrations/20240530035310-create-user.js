'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      nim_nip: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
      },
      fakultas: {
        type: Sequelize.STRING,
      },
      jurusan: {
        type: Sequelize.STRING,
      },
      dosen_pembimbingAKD: {
        type: Sequelize.STRING,
      },
      dosen_pembimbingTA: {
        type: Sequelize.STRING,
      },
      terdaftar_mulai: {
        type: Sequelize.STRING,
      },
      tempat_lahir: {
        type: Sequelize.STRING,
      },
      tanggal_lahir: {
        type: Sequelize.STRING,
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      lulus_sarjana: {
        type: Sequelize.STRING,
      },
      nomor_ijazah: {
        type: Sequelize.STRING,
      },
      nip_dosenAKD: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  }
};
