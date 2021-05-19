const { UNAUTHORIZED } = require('../httpStatuses');

class UnauthorizedError extends Error {
  constructor(...props) {
    super(...props);
    this.statusCode = UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}

module.exports.UnauthorizedError = UnauthorizedError;
