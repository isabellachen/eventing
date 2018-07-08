'use strict';

const Sequelize = require('sequelize');

const models = require('../models');

module.exports.addEvent = async (category) => {
  const categoryId = await models.Category.findOne({
    where: {
      name: {
        $like: `%${category}%`
      }
    }
  });

  if (categoryId) {
    return await models.Event.create({
      CategoryId: categoryId.dataValues.id,
      status: 'opened'
    });
  }
};

module.exports.getEvent = async (eventId) => {
  if (eventId) {
    const event = await models.Event.find({
      where: { id: eventId },
      group: ['UserRequests.id', 'Event.id', 'Category.id'],
      include: [
        {
          model: models.Category
        },
        {
          model: models.UserRequest,
        },
      ],
    });
    return event;
  }
};

module.exports.updateEvent = async (id, status) => {
  if (id) {
    await models.Event.update(
      {
        status
      },
      {
        where: {
          id
        }
      }
    );
  }
};
