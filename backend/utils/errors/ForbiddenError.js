const { FORBIDDEN } = require('../httpsErrorCodes');

class ForbiddenError extends Error {
  constructor(...props) {
    super(...props);
    this.statusCode = FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

module.exports.ForbiddenError = ForbiddenError;
