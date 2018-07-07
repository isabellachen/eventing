'use strict';

// Define the User model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    facebookId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    pictureUrl: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.UserRequest, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
    });
    User.hasMany(models.Message, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
    });
  };
  return User;
};
