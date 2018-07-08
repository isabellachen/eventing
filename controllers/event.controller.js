'use strict';

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
    await models.Event.create({
      CategoryId: categoryId.dataValues.id,
      status: 'opened'
    });
    console.log('EVENT CREATED');
  }
};

module.exports.getEvent = async (eventId) => {
  if (eventId) {
    const event = await models.Event.find(
      { where: { id: eventId } },
      {
        include: [
          { model: models.Category, as: 'Category' },
          { model: models.UserRequest, as: 'UserRequests' },
        ],
      },
    );
    return event;
  }
};
