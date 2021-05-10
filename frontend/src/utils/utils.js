const ESCAPE_BUTTON_KEY = 'Escape';
const FORM_WHITE_THEME = 'white';
const FORM_DARK_THEME = 'dark';
const AUTH_STORAGE_TOKEN_KEY = 'auth';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BASE_API_URL = IS_PRODUCTION
  ? 'https://api.chajurassic.students.nomoredomains.club'
  : 'http://localhost:3000';

export {
  ESCAPE_BUTTON_KEY,
  FORM_WHITE_THEME,
  FORM_DARK_THEME,
  AUTH_STORAGE_TOKEN_KEY,
  IS_PRODUCTION,
  BASE_API_URL,
};
