'use strict';

const models = require('../models');

module.exports.addEvent = async (event) => {
  const {
    categoryId,
    status
  } = event;

  if (categoryId) {
    const event = await models.Event.create({
      CategoryId: categoryId,
      status
    });
  }
};

module.exports.getEvent = async (eventId) => {
  if (eventId) {
    return await models.Event.find(
      { where: { id: eventId } },
      { include: [
          { model: models.Category, as: 'Category'},
          { model: models.UserRequest, as: 'UserRequests'}
        ]
      }
    );
  }
};
