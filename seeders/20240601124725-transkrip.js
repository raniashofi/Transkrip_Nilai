'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Transkrips', [
      {
      nim_nip: '123456',
      kode_matkul: 'JSI/1/101/A',
      tahun_ajaran: '2021/2022',
    },
    {
      nim_nip: '123456',
      kode_matkul: 'JSI/1/102/A',
      tahun_ajaran: '2021/2022',
    },
    {
      nim_nip: '123456',
      kode_matkul: 'JSI/1/103/A',
      tahun_ajaran: '2021/2022',
    },
    {
      nim_nip: '222222',
      kode_matkul: 'JSI/1/101/A',
      tahun_ajaran: '2021/2022',
    },
    {
      nim_nip: '222222',
      kode_matkul: 'JSI/1/102/A',
      tahun_ajaran: '2021/2022',
    },
    {
      nim_nip: '222222',
      kode_matkul: 'JSI/1/103/A',
      tahun_ajaran: '2021/2022',
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transkrips', null, {});
  }
};
