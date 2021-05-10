const { INTERNAL_SERVER_ERROR } = require('../httpsErrorCodes');

class InternalServerError extends Error {
  constructor(...props) {
    super(...props);
    this.statusCode = INTERNAL_SERVER_ERROR;
    this.name = 'InternalServerError';
  }
}

module.exports.InternalServerError = InternalServerError;
