const { FORBIDDEN } = require('../httpStatuses');

class ForbiddenError extends Error {
  constructor(...props) {
    super(...props);
    this.statusCode = FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

module.exports.ForbiddenError = ForbiddenError;
