const bcrypt = require('bcrypt');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [
        {
        email: 'dosen@unand.ac.id',
        password: await bcrypt.hash('dosen', 10), // Hashed password for 'dosen'
        role: 'dosen',
        nama: 'Dosen',
        nim_nip: '654321',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@unand.ac.id',
        password: await bcrypt.hash('admin', 10), // Hashed password for 'admin'
        role: 'admin',
        nama: 'Admin',
        nim_nip: 'Admin JSI',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'mahasiswa@unand.ac.id',
        password: await bcrypt.hash('mahasiswa', 10), // Hashed password for 'mahasiswa'
        role: 'mahasiswa',
        nama: 'Mahasiswa',
        nim_nip: '123456',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbingAKD: 'Dosen A',
        dosen_pembimbingTA: 'Dosen B',
        terdaftar_mulai: '17 juli 2022',
        tempat_lahir: '13 juni 2004',
        tanggal_lahir: 'Padang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'mahasiswa2@unand.ac.id',
        password: await bcrypt.hash('mahasiswa2', 10), // Hashed password for 'mahasiswa'
        role: 'mahasiswa',
        nama: 'Mahasiswa 2',
        nim_nip: '222222',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbingAKD: 'Dosen A',
        dosen_pembimbingTA: 'Dosen B',
        terdaftar_mulai: '17 juli 2022',
        tempat_lahir: '10 juni 2004',
        tanggal_lahir: 'Padang Panjang',
        createdAt: new Date(),
        updatedAt: new Date(),
    } 
    ], {});
    
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};