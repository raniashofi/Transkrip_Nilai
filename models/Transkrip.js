'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Transkrip extends Model {
		static associate(models) {
			Transkrip.belongsTo(models.User, { foreignKey: 'nim_nip' });
			Transkrip.belongsTo(models.MataKuliah, { foreignKey: 'kode_matkul' });
			Transkrip.belongsTo(models.TahunAjaran, { foreignKey: 'tahun_ajaran' });
		}
	}
	Transkrip.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			nim_nip: {
				type: DataTypes.STRING,
				references: {
					model: 'Users', 
					key: 'nim_nip', 
				},
			},
			nilai_huruf: {
				type: DataTypes.STRING,
			},
			nilai_mutu: {
				type: DataTypes.FLOAT,
			},
			kode_matkul: {
				type: DataTypes.STRING,
				references: {
					model: 'MataKuliahs', 
					key: 'kode_matkul',
				},
			},
			tahun_ajaran: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: 'Transkrip',
		}
	);
	return Transkrip;
};
