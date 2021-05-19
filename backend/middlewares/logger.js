const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const logsPath = path.join(__dirname, '../logs');

function makeRequestLogger() {
  return expressWinston.logger({
    transports: [
      new winston.transports.File({
        dirname: logsPath,
        filename: 'request.log',
      }),
    ],
    format: winston.format.json(),
  });
}
function makeErrorLogger() {
  return expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        dirname: logsPath,
        filename: 'error.log',
      }),
    ],
    format: winston.format.json(),
  });
}

module.exports = {
  makeRequestLogger,
  makeErrorLogger,
};
