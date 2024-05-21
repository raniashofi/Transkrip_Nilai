'use strict';

const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('sisteminformasi', 10);
    const currentDate = Sequelize.literal('CURRENT_TIMESTAMP');

    return queryInterface.bulkInsert('users', [
      {
        email: 'admin@unand.ac.id',
        password: hashedPassword,
        role : 'admin', 
        nama: 'admin jurusan',
        nim_nip: '',
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
