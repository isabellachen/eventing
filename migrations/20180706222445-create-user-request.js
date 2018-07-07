'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserRequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    EventId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Events',
        key: 'id',
      }
    },
    categories: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    location: {
      type: Sequelize.GEOMETRY
    },
    startTime: {
      allowNull: false,
      type: Sequelize.DATE
    },
    endTime: {
      allowNull: false,
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserRequests')
};
