'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MataKuliahs', [
      {
      kode_matkul: 'JSI/1/101/A',
      nama_matkul: 'Pemrograman Dasar',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/1/102/A',
      nama_matkul: 'Dasar Dasar Sistem Informasi',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/1/103/A',
      nama_matkul: 'Aljabar Linear',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/1/104/A',
      nama_matkul: 'Komunikasi Bisnis dan Teknis',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/1/105/A',
      nama_matkul: 'Matematika Diskrit',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/1/106/A',
      nama_matkul: 'Pengantar Bisnis dan Manajemen',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/1/101/B',
      nama_matkul: 'Pemrograman Dasar',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/1/102/B',
      nama_matkul: 'Dasar Dasar Sistem Informasi',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/1/103/B',
      nama_matkul: 'Aljabar Linear',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/1/104/B',
      nama_matkul: 'Komunikasi Bisnis dan Teknis',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/1/105/B',
      nama_matkul: 'Matematika Diskrit',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/1/106/B',
      nama_matkul: 'Pengantar Bisnis dan Manajemen',
      sks: 2,
    },
  
    {
      kode_matkul: 'JSI/2/201/A',
      nama_matkul: 'Interaksi Manusia dan Komputer',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/202/A',
      nama_matkul: 'Bahasa Inggris',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/2/203/A',
      nama_matkul: 'Infrastruktur Teknologi Informasi',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/2/204/A',
      nama_matkul: 'Kalkulus',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/205/A',
      nama_matkul: 'Probabilitas dan Statistik',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/2/206/A',
      nama_matkul: 'Struktur Data dan Algoritma',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/201/B',
      nama_matkul: 'Interaksi Manusia dan Komputer',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/202/B',
      nama_matkul: 'Bahasa Inggris',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/2/203/B',
      nama_matkul: 'Infrastruktur Teknologi Informasi',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/204/B',
      nama_matkul: 'Kalkulus',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/205/B',
      nama_matkul: 'Probabilitas dan Statistik',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/2/206/B',
      nama_matkul: 'Struktur Data dan Algoritma',
      sks: 3,
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MataKuliahs', null, {});
  }
};
