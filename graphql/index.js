const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

//Schema, querys and resolvers for Event Type
const {
  EventSchema,
  EventQueryResolvers,
  EventQuerySchemas
} = require('./types/Event');

//Schema, querys and resolvers for Category Type
const {
  CategorySchema,
  CategoryQueryResolvers,
  CategoryQuerySchemas
} = require('./types/Category');

//Schema, querys and resolvers for Message Type
const {
  MessageSchema,
  MessageQueryResolvers,
  MessageQuerySchemas
} = require('./types/Message');

//Schema, querys and resolvers for User Type
const {
  UserSchema,
  UserQueryResolvers,
  UserQuerySchemas
} = require('./types/User');

//Schema, querys and resolvers for UserRequest Type
const {
  UserRequestSchema,
  UserRequestQueryResolvers,
  UserRequestQuerySchemas
} = require('./types/UserRequest');

//Schema for type Location
const { LocationSchema } = require('./types/Location');

//Merge of all the query resolvers
const queryResolvers = merge(
  {},
  EventQueryResolvers,
  CategoryQueryResolvers,
  MessageQueryResolvers,
  UserQueryResolvers,
  UserRequestQueryResolvers
);

const resolvers = {
  Query: queryResolvers
};

const Root = `
type Query {
  ${EventQuerySchemas}
  ${CategoryQuerySchemas}
  ${MessageQuerySchemas}
  ${UserQuerySchemas}
  ${UserRequestQuerySchemas}
}
`;

//Schema creation
const schema = makeExecutableSchema({
  typeDefs: [
    Root,
    EventSchema,
    CategorySchema,
    MessageSchema,
    UserSchema,
    UserRequestSchema,
    LocationSchema
  ],
  resolvers
});

module.exports = schema;
