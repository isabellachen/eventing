'use strict';

const app = require('./server');

// Environment variables
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, (err) => {
  err && console.error('❌ Unable to connect to the server:', err); // eslint-disable-line no-console
  console.log(`🌍 Running server on ${PORT} - ${ENV} mode!`); // eslint-disable-line no-console
});
