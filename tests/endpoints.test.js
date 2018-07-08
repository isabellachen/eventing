'use strict';

const request = require('supertest');
const app = require('../index');

afterEach(() => {
  app.close();
});

describe('GET /event', () => {
  test('should return a 400 code if the EventId query is not specified', async () => {
    const response = await request(app).get('/event');
    expect(response.status).toEqual(400);
    expect(response.body.data).toEqual('Bad Request');
  });
});

describe('POST /userRequest', () => {
  it('should return info on an event and the user participants', () => {
    console.log('hello');
  });
});
