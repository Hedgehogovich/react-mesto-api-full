const mongoose = require('mongoose');
const { isCelebrateError } = require('celebrate');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { ConflictError } = require('../utils/errors/ConflictError');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { InternalServerError } = require('../utils/errors/InternalServerError');
const { BadRequestError } = require('../utils/errors/BadRequestError');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/httpStatuses');

function handleCelebrateError(err, req, res) {
  const [, firstSegmentError] = err.details.entries().next().value;

  res.status(BAD_REQUEST).send({ message: firstSegmentError.message });
}

function handleUnexpectedError(err, res) {
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
}

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (isCelebrateError(err)) {
    handleCelebrateError(err, req, res);
    return;
  }

  switch (err.name) {
    case mongoose.Error.ValidationError.name:
    case mongoose.Error.CastError.name:
      res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      return;
    case mongoose.Error.DocumentNotFoundError.name:
      res.status(NOT_FOUND).send({ message: 'Запрашиваемые данные не найдены' });
      break;
    case SyntaxError.name:
      // Обработка исключения при некорректном JSON внутри express
      if (err.status === BAD_REQUEST && 'body' in err) {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        handleUnexpectedError(err, res);
      }
      break;
    case BadRequestError.name:
    case InternalServerError.name:
    case ForbiddenError.name:
    case NotFoundError.name:
    case UnauthorizedError.name:
    case ConflictError.name:
      res.status(err.statusCode).send({ message: err.message });
      break;
    default:
      handleUnexpectedError(err, res);
  }
};
