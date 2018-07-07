'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Categories', [{
    id: 1,
    name: 'Volley',
    userLimit: 6,
    createdAt: '2018-07-07 21:13:13.146+02',
    updatedAt: '2018-07-07 21:13:13.146+02'
  },
  {
    id: 2,
    name: 'Nightout',
    userLimit: 2,
    createdAt: '2018-07-07 21:13:13.146+02',
    updatedAt: '2018-07-07 21:13:13.146+02'
  },
  {
    id: 3,
    name: 'Chess',
    userLimit: 2,
    createdAt: '2018-07-07 21:13:13.146+02',
    updatedAt: '2018-07-07 21:13:13.146+02'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categories', null, {})
};
