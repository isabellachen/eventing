module.exports = {
  id: userRequest => userRequest.id,
  categories: userRequest => userRequest.categories,
  user: userRequest => userRequest.user,
  event: userRequest => userRequest.event,
  startTime: userRequest => userRequest.starTime,
  endTime: userRequest => userRequest.starTime
};
