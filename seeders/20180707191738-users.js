'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 2082147955157984,
          firstName: 'Marlon',
          lastName: 'Becker',
          pictureUrl:
            'https://scontent.fbcn5-1.fna.fbcdn.net/v/t1.0-1/c12.12.155.155/1003374_10151927852927189_750330015_n.jpg?_nc_cat=0&oh=9f2777991b2837397d2f72b1917f670f&oe=5BA8E1AE',
          createdAt: '2018-07-07 21:13:13.146+02',
          updatedAt: '2018-07-07 21:13:13.146+02',
        },
        {
          id: 1766956916726715,
          firstName: 'Marco',
          lastName: 'Ghiani',
          pictureUrl:
            'https://scontent.fbcn5-1.fna.fbcdn.net/v/t1.0-1/p320x320/13407270_909636179145231_6057566230788386556_n.jpg?_nc_cat=0&oh=c6a2ab3ea0f6af676a32bdafab76cac8&oe=5BDB979D',
          createdAt: '2018-07-07 21:13:13.146+02',
          updatedAt: '2018-07-07 21:13:13.146+02',
        },
        {
          id: 1921533581204203,
          firstName: 'Isabella',
          lastName: 'Chen',
          pictureUrl:
            'https://scontent.fbcn5-1.fna.fbcdn.net/v/t1.0-1/p320x320/30706746_10213998210603929_1654371653813010432_n.jpg?_nc_cat=0&oh=2800f5a37802e7d66c7ec30fd1fa883f&oe=5BA5B00C',
          createdAt: '2018-07-07 21:13:13.146+02',
          updatedAt: '2018-07-07 21:13:13.146+02',
        },
        // {
        //   id: 1719389724823081,
        //   firstName: 'Leonardo',
        //   lastName: 'Di Vittorio',
        //   pictureUrl:
        //     'https://scontent.fbcn5-1.fna.fbcdn.net/v/t1.0-1/p320x320/17457492_10212663524413836_3610687518386802195_n.jpg?_nc_cat=0&oh=686a39829a3836638c20fd0303076804&oe=5BE5AC36',
        //   createdAt: '2018-07-07 21:13:13.146+02',
        //   updatedAt: '2018-07-07 21:13:13.146+02',
        // },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {}),
};
