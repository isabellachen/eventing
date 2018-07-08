module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.body = e.message;
    ctx.status = 500;
  }
};
