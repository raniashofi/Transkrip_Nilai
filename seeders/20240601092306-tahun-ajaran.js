'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('TahunAjarans', [
      {
      tahun_ajaran: '2021/2022',
    },
    {
      tahun_ajaran: '2022/2023',
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TahunAjarans', null, {});
  }
};
