'use strict';

const Sequelize = require('Sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Events', [
    {
      id: 1,
      status: 'OPENED',
      CategoryId: 1,
      description: 'Volleyball match',
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Events', null, {})
};
