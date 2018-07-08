'use strict';

const models = require('../models');
const event = require('../controllers/event.controller');
const userRequest = require('../controllers/userRequest.controller');
const botController = require('../controllers/bot.controller');

module.exports.matchEvent = async (id, UserId, location, dates, categories) => {
  const availableEvents = await models.Event.findAll({
    where: {
      status: 'OPENED',
    },
    include: [{
      model: models.Category,
      where: {
        name: { $in: categories }
      }
    }]
  });

  console.log('====================================');
  console.log(availableEvents);
  console.log('====================================');

  if (!availableEvents.length) {
    categories.forEach(async (category) => {
      const newEvent = await event.addEvent(category);
      userRequest.updateRequestStatus(id, UserId, newEvent.dataValues.id, 'ACCEPTED');
    });
    botController.eventPending(UserId);
    return 1; // Return code 1 to identify the case (No events, new events created)
  }
  userRequest.updateRequestStatus(id, UserId, availableEvents[0].dataValues.id, 'ACCEPTED');
  return 2; // Return code 2 to identify the case (events occurrency, event updated)
};
