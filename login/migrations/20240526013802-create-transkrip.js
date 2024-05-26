'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transkrip', {
      nilai_huruf: {
        type: Sequelize.STRING
      },
      nilai_mutu: {
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      kode_matkul: {
        type: Sequelize.STRING,
        references: {
          model: 'mataKuliah',
          key: 'kode_matkul'
        }
      },
      tahun_ajaran: {
        type: Sequelize.STRING,
        references: {
          model: 'tahunAjaran',
          key: 'tahun_ajaran'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transkrip');
  }
};
