const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const authMiddleware = require('../middlewares/auth');
const {
  getUsers,
  findOneUser,
  findCurrentUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/', authMiddleware, getUsers);
router.get('/me', authMiddleware, findCurrentUser);
router.get('/:userId', authMiddleware, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().alphanum().required().messages({
      'any.required': 'Некорректный ID пользователя',
      'string.base': 'Некорректный ID пользователя',
      'string.alphanum': 'Некорректный ID пользователя',
    }),
  }),
}), findOneUser);
router.patch('/me', authMiddleware, celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Имя обязательно для заполнения',
        'string.empty': 'Поле Имя обязательно для заполнения',
        'string.min': 'Имя должно быть не менее 2 символов в длину',
        'string.max': 'Имя должно быть не более 30 символов в длину',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Описание обязательно для заполнения',
        'string.empty': 'Поле Описание обязательно для заполнения',
        'string.min': 'Описание должно быть не менее 2 символов в длину',
        'string.max': 'Описание должно быть не более 30 символов в длину',
      }),
  }),
}), editUser);
router.patch('/me/avatar', authMiddleware, celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri().required().messages({
      'any.required': 'Поле Аватар обязательно для заполнения',
      'string.empty': 'Поле Аватар обязательно для заполнения',
      'string.uri': 'Некорректная ссылка',
    }),
  }),
}), editAvatar);

module.exports = router;
