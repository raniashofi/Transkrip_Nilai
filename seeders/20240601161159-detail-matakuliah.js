'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('DetailMataKuliahs', [
      {
      nim_nip: '654321',
      kode_matkul:'JSI/1/101/A',
    },
    {
      nim_nip: '654321',
      kode_matkul:'JSI/1/101/B',
    },
  ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DetailMataKuliahs', null, {});
  }
};