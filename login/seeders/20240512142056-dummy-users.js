'use strict';

const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin', 10);
    const currentDate = Sequelize.literal('CURRENT_TIMESTAMP');

    return queryInterface.bulkInsert('users', [
      {
        email: 'contoh@example.com',
        password: hashedPassword,
        role : 'mahasiswa', 
        nama: 'Contoh User',
        nim_nip: '123456',
        fakultas: 'Fakultas Contoh',
        jurusan: 'Jurusan Contoh',
        createdAt : currentDate,
        updatedAt : currentDate,

      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
