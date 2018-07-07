exports.userRequest = (_, args) => {
  return [
    {
      id: 1,
      categories: [
        {
          id: 1,
          name: 'Beach volley'
        },
        {
          id: 2,
          name: 'football'
        }
      ],
      location: { lat: 45.123456, lng: 2.123456 },
      startTime: '2018-07-21 15:30:00',
      endTime: '2018-07-22 16:30:00',
      user: {
        id: 1,
        firstname: 'Marco',
        lastname: 'Ghiani',
        facebookId: 12131233123
      }
    },
    {
      id: 2,
      categories: [
        {
          id: 1,
          name: 'Tennis'
        },
        {
          id: 2,
          name: 'Basketball'
        }
      ],
      location: { lat: 45.123456, lng: 2.123456 },
      startTime: '2018-08-21 15:30:00',
      endTime: '2018-08-22 16:30:00',
      user: {
        id: 2,
        firstname: 'Isabella',
        lastname: 'Chen',
        facebookId: 12312312312
      }
    }
  ];
};
