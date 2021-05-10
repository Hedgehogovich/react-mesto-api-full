const { CONFLICT } = require('../httpsErrorCodes');

class ConflictError extends Error {
  constructor(...props) {
    super(...props);
    this.statusCode = CONFLICT;
    this.name = 'ConflictError';
  }
}

module.exports.ConflictError = ConflictError;
