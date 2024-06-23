'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('DetailMataKuliahs', [
    //dosen 1
      {
      nim_nip: '123456789',
      kode_matkul:'JSI/1/101/A',
    },
    {
      nim_nip: '123456789',
      kode_matkul:'JSI/1/101/B',
    },
    {
      nim_nip: '123456789',
      kode_matkul:'JSI/2/201/A',
    },
    {
      nim_nip: '123456789',
      kode_matkul:'JSI/2/201/B',
    },
    {
      nim_nip: '123456789',
      kode_matkul:'JSI/1/106/A',
    },
    {
      nim_nip: '123456789',
      kode_matkul:'JSI/1/106/B',
    },
    {
      nim_nip: '123456789',
      kode_matkul:'JSI/2/206/A',
    },
    {
      nim_nip: '123456789',
      kode_matkul:'JSI/2/206/B',
    },
    

    //dosen 2
    {
      nim_nip: '234567890',
      kode_matkul:'JSI/1/102/A',
    },
    {
      nim_nip: '234567890',
      kode_matkul:'JSI/1/102/B',
    },
    {
      nim_nip: '234567890',
      kode_matkul:'JSI/2/202/A',
    },
    {
      nim_nip: '234567890',
      kode_matkul:'JSI/2/202/B',
    },

    //dosen 3
    {
      nim_nip: '345678901',
      kode_matkul:'JSI/1/103/A',
    },
    {
      nim_nip: '345678901',
      kode_matkul:'JSI/1/103/B',
    },
    {
      nim_nip: '345678901',
      kode_matkul:'JSI/2/203/A',
    },
    {
      nim_nip: '345678901',
      kode_matkul:'JSI/2/203/B',
    },

    //dosen 4
    {
      nim_nip: '456789012',
      kode_matkul:'JSI/1/104/A',
    },
    {
      nim_nip: '456789012',
      kode_matkul:'JSI/1/104/B',
    },
    {
      nim_nip: '456789012',
      kode_matkul:'JSI/2/204/A',
    },
    {
      nim_nip: '456789012',
      kode_matkul:'JSI/2/204/B',
    },

    //dosen 5
    {
      nim_nip: '567890123',
      kode_matkul:'JSI/1/105/A',
    },
    {
      nim_nip: '567890123',
      kode_matkul:'JSI/1/105/B',
    },
    {
      nim_nip: '567890123',
      kode_matkul:'JSI/2/205/A',
    },
    {
      nim_nip: '567890123',
      kode_matkul:'JSI/2/205/B',
    }

  ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DetailMataKuliahs', null, {});
  }
};