'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    id: 2082147955157984,
    firstName: 'Marlon',
    lastName: 'Becker',
    pictureUrl: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=2082147955157984&width=1024&ext=1531250826&hash=AeQ1zC5I_1vtCvfV',
    createdAt: '2018-07-07 21:13:13.146+02',
    updatedAt: '2018-07-07 21:13:13.146+02'
  },
  {
    id: 1766956916726715,
    firstName: 'Marco',
    lastName: 'Ghiani',
    pictureUrl: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=1766956916726715&width=1024&ext=1531250818&hash=AeR_mixdfk9S8vz1',
    createdAt: '2018-07-07 21:13:13.146+02',
    updatedAt: '2018-07-07 21:13:13.146+02'
  },
  {
    id: 1921533581204203,
    firstName: 'Isabella',
    lastName: 'Chen',
    pictureUrl: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=1921533581204203&width=1024&ext=1531250804&hash=AeQV1zi9dF3JVm2F',
    createdAt: '2018-07-07 21:13:13.146+02',
    updatedAt: '2018-07-07 21:13:13.146+02'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
