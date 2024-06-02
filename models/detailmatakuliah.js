'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DetailMataKuliah extends Model {
		static associate(models) {
			DetailMataKuliah.belongsTo(models.User, { foreignKey: 'nim_nip' });
			DetailMataKuliah.belongsTo(models.MataKuliah, { foreignKey: 'kode_matkul' });
		}
	}
	DetailMataKuliah.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			nim_nip: {
				type: DataTypes.STRING,
				references: {
					model: 'Users',
					key: 'nim_nip',
				},
			},
			kode_matkul: {
				type: DataTypes.STRING,
				allowNull: false,
				references: {
					model: 'MataKuliahs',
					key: 'kode_matkul',
				},
			},
		},
		{
			sequelize,
			modelName: 'DetailMataKuliah',
			tableName: 'DetailMataKuliahs',
			timestamps: true,
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		}
	);
	return DetailMataKuliah;
};
