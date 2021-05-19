const jwt = require('jsonwebtoken');
const { ENCRYPTION_KEY } = require('../utils/constants');
const { UNAUTHORIZED } = require('../utils/httpStatuses');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.replace('Bearer ', '') : null;

  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, ENCRYPTION_KEY);
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
};
