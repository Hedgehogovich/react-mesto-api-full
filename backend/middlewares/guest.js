const jwt = require('jsonwebtoken');
const { ENCRYPTION_KEY } = require('../utils/constants');
const { FORBIDDEN } = require('../utils/httpsErrorCodes');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    next();

    return;
  }

  try {
    jwt.verify(token, ENCRYPTION_KEY);
    res.status(FORBIDDEN).send({ message: 'Доступ запрещён' });
  } catch (err) {
    next();
  }
};
