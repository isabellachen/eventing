const router = require('koa-router')();
const { graphqlKoa } = require('apollo-server-koa');

// Require schema from graphql

// Pass the schema as argument
router.get('/graphql', graphqlKoa({ schema }));
