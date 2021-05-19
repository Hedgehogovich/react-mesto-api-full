const { BAD_REQUEST } = require('../httpStatuses');

class BadRequestError extends Error {
  constructor(...props) {
    super(...props);
    this.statusCode = BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}

module.exports.BadRequestError = BadRequestError;
