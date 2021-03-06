const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoError } = require('mongodb');
const User = require('../models/user');
const { ConflictError } = require('../utils/errors/ConflictError');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');
const {
  BCRYPT_SALT_ROUNDS,
  MONGODB_DUPLICATE_ERROR_CODE,
  ENCRYPTION_KEY,
} = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.send({ data: { message: 'Вы успешно зарегистрировались!' } }))
    .catch((err) => {
      if (err instanceof MongoError && err.code === MONGODB_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь с таким Email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.findOneUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.findCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.editUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.editAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        ENCRYPTION_KEY,
        { expiresIn: 604800 },
      );

      res.send({ data: { token } });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};
