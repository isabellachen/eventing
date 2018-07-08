'use strict';

// Define the Event model
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    status: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Event.associate = (models) => {
    // associations can be defined here
    Event.hasMany(models.UserRequest, {
      foreignKey: 'EventId',
      onDelete: 'CASCADE'
    });
    Event.belongsTo(models.Category, {
      onDelete: 'CASCADE',
      foreignKey: 'CategoryId',
    });
  };
  return Event;
};

