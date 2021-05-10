const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, Segments } = require('celebrate');

require('dotenv').config();

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const guestMiddleware = require('./middlewares/guest');
const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/notFound');
const authMiddleware = require('./middlewares/auth');
const { FRONTEND_ORIGIN, IS_PRODUCTION } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login, logout } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
}));

if (IS_PRODUCTION) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  app.use(helmet());
  app.use(limiter);
  app.use(requestLogger);
}
app.listen(process.env.LISTEN_PORT || 3000);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.post('/signin', guestMiddleware, celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'Поле Email является обязательным для заполнения',
      'string.empty': 'Поле Email является обязательным для заполнения',
      'string.email': 'Некорректный Email',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле Пароль является обязательным для заполнения',
      'string.empty': 'Поле Пароль является обязательным для заполнения',
    }),
  }),
}), login);
app.post('/signup', guestMiddleware, celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'Поле Email является обязательным для заполнения',
      'string.empty': 'Поле Email является обязательным для заполнения',
      'string.email': 'Некорректный Email',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Поле Пароль является обязательным для заполнения',
      'string.empty': 'Поле Пароль является обязательным для заполнения',
      'string.min': 'Пароль должен быть не менее 8 символов в длину',
    }),
    name: Joi.string().empty('').min(2).max(30)
      .messages({
        'string.min': 'Имя должно быть не менее 2 символов в длину',
        'string.max': 'Имя должно быть не более 30 символов в длину',
      }),
    about: Joi.string().empty('').min(2).max(30)
      .messages({
        'string.min': 'Описание должно быть не менее 2 символов в длину',
        'string.max': 'Описание должно быть не более 30 символов в длину',
      }),
    avatar: Joi.string().empty('').uri().messages({
      'string.empty': 'Поле Аватар не может быть пустым',
      'string.uri': 'Некорректная ссылка',
    }),
  }),
}), createUser);
app.post('/signout', authMiddleware, logout);

if (IS_PRODUCTION) {
  app.use(errorLogger);
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);
