'use strict';

const Sequelize = require('Sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('UserRequests', [
    {
      //Marlon
      id: 1,
      dates: ["2018-7-12", "2018-7-14"],
      location: Sequelize.fn('ST_GeomFromText','POINT(41.3949147 2.1957668)'),
      categories: ["volley", "nightout"],
      status: 'PENDING',
      UserId: 2082147955157984,
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
    {
      //Marco
      id: 2,
      dates: ["2018-7-8", "2018-7-9"],
      location: Sequelize.fn('ST_GeomFromText','POINT(41.39491471 2.19576682)'),
      categories: ["volley", "chess"],
      status: 'PENDING',
      UserId: 1766956916726715,
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
    {
      //Marco
      id: 3,
      dates: ["2018-7-8", "2018-7-12", "2018-7-14"],
      location: Sequelize.fn('ST_GeomFromText','POINT(41.39491472 2.19576683)'),
      categories: ["volley"],
      status: 'PENDING',
      UserId: 1766956916726715,
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
    {
      //Isa
      id: 4,
      dates: ["2018-7-9", "2018-7-10", "2018-7-12"],
      location: Sequelize.fn('ST_GeomFromText','POINT(41.39491471 2.19576681)'),
      categories: ["volley"],
      status: 'PENDING',
      UserId: 1921533581204203,
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
    {
      //Isa
      id: 5,
      dates: ["2018-7-11", "2018-7-12", "2018-7-14"],
      location: Sequelize.fn('ST_GeomFromText','POINT(41.39491473 2.195766812)'),
      categories: ["chess"],
      status: 'PENDING',
      UserId: 1921533581204203,
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
    {
      //Marlon
      id: 6,
      dates: ["2018-7-12", "2018-7-14"],
      location: Sequelize.fn('ST_GeomFromText','POINT(41.3949147 2.1957668)'),
      categories: ["volley", "nightout"],
      status: 'PENDING',
      UserId: 2082147955157984,
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
    {
      //Isa
      id: 7,
      dates: ["2018-7-11", "2018-7-12", "2018-7-14"],
      location: Sequelize.fn('ST_GeomFromText','POINT(41.39491473 2.195766812)'),
      categories: ["volley"],
      status: 'ACCEPTED',
      EventId: 1,
      UserId: 1921533581204203,
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
    {
      //Marlon
      id: 8,
      dates: ["2018-7-12", "2018-7-14"],
      location: Sequelize.fn('ST_GeomFromText','POINT(41.3949147 2.1957668)'),
      categories: ["volley", "nightout"],
      status: 'ACCEPTED',
      UserId: 2082147955157984,
      createdAt: '2018-07-07 21:13:13.146+02',
      updatedAt: '2018-07-07 21:13:13.146+02'
    },
    ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UserRequests', null, {})
};
