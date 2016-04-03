require('babel-core/register')({});
require('babel-polyfill');

var server = require('./server').default;

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('--> Serving app from: ' + PORT);
});
