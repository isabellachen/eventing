'use strict';

// Define the Message model
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING
  }, {});
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.Event, {
      onDelete: 'CASCADE',
      foreignKey: 'EventId',
    });
    Message.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
    });
  };
  return Message;
};
