const BCRYPT_SALT_ROUNDS = 10;
const MONGODB_DUPLICATE_ERROR_CODE = 11000;
const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9]{2,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)#?/;
const BASE_API_DOMAIN = 'api.chajurassic.students.nomoredomains.club';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const ENCRYPTION_KEY = IS_PRODUCTION ? process.env.ENCRYPTION_KEY : 'some-secret';
const BASE_API_URL = IS_PRODUCTION
  ? 'https://' + BASE_API_DOMAIN
  : 'http://localhost:3000';

module.exports = {
  BCRYPT_SALT_ROUNDS,
  MONGODB_DUPLICATE_ERROR_CODE,
  URL_REGEXP,
  BASE_API_URL,
  BASE_API_DOMAIN,
  IS_PRODUCTION,
  ENCRYPTION_KEY
};
