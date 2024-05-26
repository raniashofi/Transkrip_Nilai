'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detailTahunAjar', {
      tahun_ajaran: {
        type: Sequelize.STRING,
        references: {
          model: 'tahunAjaran',
          key: 'tahun_ajaran'
        }
      },
      kode_kelas: {
        type: Sequelize.STRING,
        references: {
          model: 'kelas',
          key: 'kode_kelas'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detailTahunAjar');
  }
};
