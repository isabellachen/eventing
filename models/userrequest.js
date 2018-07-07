'use strict';

// Define the UserRequest model
module.exports = (sequelize, DataTypes) => {
  const UserRequest = sequelize.define('UserRequest', {
    categories: DataTypes.ARRAY(DataTypes.TEXT),
    dates: DataTypes.ARRAY(DataTypes.TEXT),
    location: DataTypes.GEOMETRY('POINT', 4326),
    status: DataTypes.STRING,
  }, {});
  UserRequest.associate = (models) => {
    // associations can be defined here
    UserRequest.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
    UserRequest.belongsTo(models.Event, {
      onDelete: 'CASCADE',
      foreignKey: 'EventId',
    });
  };
  return UserRequest;
};
