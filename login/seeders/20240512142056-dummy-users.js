const bcrypt = require('bcrypt');
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    await queryInterface.bulkInsert('users', [
      {
        email: 'dosen@unand.ac.id',
        password: await bcrypt.hash('dosen', 10), // Hashed password for 'dosen'
        role: 'dosen',
        nama: 'Dosen',
        nim_nip: '654321',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbing: '',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        email: 'admin@unand.ac.id',
        password: await bcrypt.hash('admin', 10), // Hashed password for 'admin'
        role: 'admin',
        nama: 'Admin',
        nim_nip: '',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbing: '',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        email: 'mahasiswa@unand.ac.id',
        password: await bcrypt.hash('mahasiswa', 10), // Hashed password for 'mahasiswa'
        role: 'mahasiswa',
        nama: 'Mahasiswa',
        nim_nip: '123456',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbing: 'dosen A',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
