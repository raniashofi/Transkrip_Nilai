const bcrypt = require('bcrypt');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [
        {
        email: 'dosen1@unand.ac.id',
        password: await bcrypt.hash('dosen', 10), // Hashed password for 'dosen'
        role: 'dosen',
        nama: 'Dosen1',
        nim_nip: '123456789',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'dosen2@unand.ac.id',
        password: await bcrypt.hash('dosen', 10), // Hashed password for 'dosen'
        role: 'dosen',
        nama: 'Dosen2',
        nim_nip: '234567890',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'dosen3@unand.ac.id',
        password: await bcrypt.hash('dosen', 10), // Hashed password for 'dosen'
        role: 'dosen',
        nama: 'Dosen3',
        nim_nip: '345678901',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'dosen4@unand.ac.id',
        password: await bcrypt.hash('dosen', 10), // Hashed password for 'dosen'
        role: 'dosen',
        nama: 'Dosen4',
        nim_nip: '456789012',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'dosen5@unand.ac.id',
        password: await bcrypt.hash('dosen', 10), // Hashed password for 'dosen'
        role: 'dosen',
        nama: 'Dosen5',
        nim_nip: '567890123',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@unand.ac.id',
        password: await bcrypt.hash('admin', 10), // Hashed password for 'admin'
        role: 'admin',
        nama: 'Admin JSI',
        nim_nip: 'Admin JSI',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: '2211521004_nadia@unand.ac.id',
        password: await bcrypt.hash('mahasiswa', 10), // Hashed password for 'mahasiswa'
        role: 'mahasiswa',
        nama: 'Nadia Deari Hanifah',
        nim_nip: '2211521004',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbingAKD: 'Dosen A',
        nip_dosenAKD:'123456789',
        dosen_pembimbingTA: 'Dosen B',
        terdaftar_mulai: '17 juli 2022',
        tempat_lahir: 'Padang',
        tanggal_lahir: '1 Januari 2004',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: '2211521002_najla@unand.ac.id',
        password: await bcrypt.hash('mahasiswa', 10), // Hashed password for 'mahasiswa'
        role: 'mahasiswa',
        nama: 'Najla Humaira',
        nim_nip: '2211521002',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbingAKD: 'Dosen A',
        nip_dosenAKD:'123456789',
        dosen_pembimbingTA: 'Dosen B',
        terdaftar_mulai: '17 juli 2022',
        tempat_lahir: 'Padang',
        tanggal_lahir: '2 Februari 2004',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: '2211523010_azhra@unand.ac.id',
        password: await bcrypt.hash('mahasiswa', 10), // Hashed password for 'mahasiswa'
        role: 'mahasiswa',
        nama: 'Azhra Meisa Khairani',
        nim_nip: '2211523010',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbingAKD: 'Dosen A',
        nip_dosenAKD:'123456789',
        dosen_pembimbingTA: 'Dosen B',
        terdaftar_mulai: '17 juli 2022',
        tempat_lahir: 'Padang',
        tanggal_lahir: '9 Februari 2003',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: '2211523014_rania@unand.ac.id',
        password: await bcrypt.hash('mahasiswa', 10), // Hashed password for 'mahasiswa'
        role: 'mahasiswa',
        nama: 'Rania Shofi Malika',
        nim_nip: '2211523014',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbingAKD: 'Dosen A',
        nip_dosenAKD:'123456789',
        dosen_pembimbingTA: 'Dosen B',
        terdaftar_mulai: '17 juli 2022',
        tempat_lahir: 'Padang',
        tanggal_lahir: '13 juni 2004',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: '2211523016_zhafira@unand.ac.id',
        password: await bcrypt.hash('mahasiswa2', 10), // Hashed password for 'mahasiswa'
        role: 'mahasiswa',
        nama: 'Mahasiswa 2',
        nim_nip: '2211523016',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        dosen_pembimbingAKD: 'Dosen A',
        nip_dosenAKD: '123456789',
        dosen_pembimbingTA: 'Dosen B',
        terdaftar_mulai: '17 juli 2022',
        tempat_lahir: 'Padang Panjang',
        tanggal_lahir: '10 juni 2004',
        createdAt: new Date(),
        updatedAt: new Date(),
    } 
    ], {});
    
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};