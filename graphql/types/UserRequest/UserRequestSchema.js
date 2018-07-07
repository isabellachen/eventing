module.exports = `
  type UserRequest {
    id: Int!
    categories: [Category]!
    event: [Event]
    user: User!
    startTime: String!
    endTime: String!
    location: Location!
  }
`;
