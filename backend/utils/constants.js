const BCRYPT_SALT_ROUNDS = 10;
const MONGODB_DUPLICATE_ERROR_CODE = 11000;
const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9]{2,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)#?/;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const {
  FRONTEND_ORIGIN = 'http://localhost:3001',
  ENCRYPTION_KEY = 'some-secret-key',
} = process.env;
const JWT_SESSION_NAME = 'jwt';

module.exports = {
  BCRYPT_SALT_ROUNDS,
  MONGODB_DUPLICATE_ERROR_CODE,
  URL_REGEXP,
  FRONTEND_ORIGIN,
  IS_PRODUCTION,
  ENCRYPTION_KEY,
  JWT_SESSION_NAME,
};
