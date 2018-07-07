const router = require('koa-router')();
const { graphqlKoa } = require('apollo-server-koa');
const expressPlayground = require('graphql-playground-middleware-koa').default;

// Require schema from graphql
const schema = require('./graphql');

// Pass the schema as an argument
router.post('/graphql', graphqlKoa({ schema }));

router.get(
  '/explore',
  expressPlayground({
    endpoint: '/graphql'
  })
);

module.exports = router;
