'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Transkrips', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nim_nip: {
				type: Sequelize.STRING,
				references: {
					model: 'Users',
					key: 'nim_nip',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			nilai_huruf: {
				type: Sequelize.STRING,
			},
			nilai_mutu: {
				type: Sequelize.FLOAT,
			},
			kode_matkul: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'MataKuliahs',
					key: 'kode_matkul',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			tahun_ajaran: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'TahunAjarans',
					key: 'tahun_ajaran',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Transkrips');
	},
};
