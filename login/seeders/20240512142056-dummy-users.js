'use strict';

const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('dosen', 10);
    const currentDate = Sequelize.literal('CURRENT_TIMESTAMP');

    return queryInterface.bulkInsert('users', [
      {
        email: 'dosen@unand.ac.id',
        password: hashedPassword,
        role : 'dosen', 
        nama: 'dosen sistem informasi',
        nim_nip: '654321',
        fakultas: 'FTI',
        jurusan: 'Sistem Informasi',
        createdAt : currentDate,
        updatedAt : currentDate,

      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
