'use strict';

const models = require('../models');

module.exports.getEventInfo = async (EventId) => {
  const eventInfo = {};

  const users = await models.UserRequest.findAll({
    attributes: ['EventId', 'categories'],
    where: {
      EventId,
      status: 'ACCEPTED'
    },
    include: [{
      model: models.User
    },
    {
      model: models.Event
    }]
  });

  eventInfo.Event = { ...users[0].get({ plain: true }).Event };
  eventInfo.Category = users[0].get({ plain: true }).categories[0];
  eventInfo.Users = users.map(user => user.get({ plain: true }).User);

  return eventInfo;
};
