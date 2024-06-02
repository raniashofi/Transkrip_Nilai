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
      sks: 3,
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
      kode_matkul: 'JSI/2/101/A',
      nama_matkul: 'Struktur Data dan Algoritma',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/102/A',
      nama_matkul: 'Bahasa Inggris',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/2/103/A',
      nama_matkul: 'Kalkulus',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/101/B',
      nama_matkul: 'Struktur Data dan Algoritma',
      sks: 3,
    },
    {
      kode_matkul: 'JSI/2/102/B',
      nama_matkul: 'Bahasa Inggris',
      sks: 2,
    },
    {
      kode_matkul: 'JSI/2/103/B',
      nama_matkul: 'Kalkulus',
      sks: 3,
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MataKuliahs', null, {});
  }
};
