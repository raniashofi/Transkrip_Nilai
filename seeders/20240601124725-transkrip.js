'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Transkrips', [
    //mahasiswa 1
      {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/1/101/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/1/102/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/1/103/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/1/104/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/1/105/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/1/106/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/2/201/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/2/202/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/2/203/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/2/204/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/2/205/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523014',
      kode_matkul: 'JSI/2/206/A',
      tahun_ajaran: '2023/2024',
    },

    //mahasiswa 2
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/1/101/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/1/102/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/1/103/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/1/104/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/1/105/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/1/106/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/2/201/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/2/202/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/2/203/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/2/204/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/2/205/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521004',
      kode_matkul: 'JSI/2/206/A',
      tahun_ajaran: '2023/2024',
    },

    //mahasiswa 3
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/1/101/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/1/102/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/1/103/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/1/104/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/1/105/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/1/106/A',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/2/201/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/2/202/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/2/203/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/2/204/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/2/205/A',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523010',
      kode_matkul: 'JSI/2/206/A',
      tahun_ajaran: '2023/2024',
    },

    //mahasiswa 4
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/1/101/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/1/102/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/1/103/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/1/104/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/1/105/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/1/106/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/2/201/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/2/202/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/2/203/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/2/204/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/2/205/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211521002',
      kode_matkul: 'JSI/2/206/B',
      tahun_ajaran: '2023/2024',
    },

    //mahasiswa 5
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/1/101/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/1/102/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/1/103/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/1/104/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/1/105/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/1/106/B',
      tahun_ajaran: '2022/2023',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/2/201/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/2/202/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/2/203/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/2/204/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/2/205/B',
      tahun_ajaran: '2023/2024',
    },
    {
      nim_nip: '2211523016',
      kode_matkul: 'JSI/2/206/B',
      tahun_ajaran: '2023/2024',
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transkrips', null, {});
  }
};
