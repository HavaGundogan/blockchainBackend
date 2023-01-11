'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User_Posts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User_Posts.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
		},
		{
			sequelize,
			modelName: 'User_Posts',
		}
	);

	User_Posts.associate = (models) => {
		User_Posts.hasMany(models.UserTable);
		User_Posts.hasMany(models.PostTable);
	};
	return User_Posts;
};
