const BCRYPT_SALT_ROUNDS = 10;
const MONGODB_DUPLICATE_ERROR_CODE = 11000;
const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9]{2,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)#?/;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const FRONTEND_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:3001';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'some-secret-key';
const JWT_SESSION_COOKIE = 'jwt';
const SET_COOKIE_PARAMS = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
};

module.exports = {
  BCRYPT_SALT_ROUNDS,
  MONGODB_DUPLICATE_ERROR_CODE,
  URL_REGEXP,
  FRONTEND_ORIGIN,
  IS_PRODUCTION,
  ENCRYPTION_KEY,
  JWT_SESSION_COOKIE,
  SET_COOKIE_PARAMS,
};
