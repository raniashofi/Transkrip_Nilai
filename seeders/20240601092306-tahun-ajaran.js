'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('TahunAjarans', [
      {
      tahun_ajaran: '2022/2023',
    },
    {
      tahun_ajaran: '2023/2024',
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TahunAjarans', null, {});
  }
};
