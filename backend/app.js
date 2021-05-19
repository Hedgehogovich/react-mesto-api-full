const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const guestRoutes = require('./routes/guest');

const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/notFound');

const { makeRequestLogger, makeErrorLogger } = require('./middlewares/logger');
const { FRONTEND_ORIGIN, IS_PRODUCTION, LISTEN_PORT } = require('./utils/constants');

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
  app.use(makeRequestLogger());
  app.use(helmet());

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }));
}

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use(guestRoutes);

if (IS_PRODUCTION) {
  app.use(makeErrorLogger());
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(LISTEN_PORT);
