'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PostTable extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	PostTable.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
			comment: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			photoPath: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'PostTable',
		}
	);

	PostTable.associate = (models) => {
		PostTable.belongsToMany(
			models.UserTable,
			{ through: models.User_Posts },
			{
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}
		);
	};
	return PostTable;
};
