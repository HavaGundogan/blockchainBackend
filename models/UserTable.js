'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
	class UserTable extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	UserTable.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			fullName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			diseaseName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'UserTable',
		}
	);

	UserTable.beforeCreate(async (user) => {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	});

	UserTable.associate = (models) => {
		UserTable.belongsToMany(
			models.PostTable,
			{ through: models.User_Posts },
			{
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}
		);
	};
	return UserTable;
};
