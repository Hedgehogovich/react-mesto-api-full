const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const authMiddleware = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  dislikeLike,
} = require('../controllers/cards');

const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
      .messages({
        'any.required': 'Некорректный ID карточки',
        'string.base': 'Некорректный ID карточки',
        'string.length': 'Некорректный ID карточки',
        'string.hex': 'Некорректный ID карточки',
      }),
  }),
});

router.get('/', authMiddleware, getCards);
router.post('/', authMiddleware, celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Название обязательно для заполнения',
        'string.empty': 'Поле Название обязательно для заполнения',
        'string.min': 'Название должно быть не менее 2 символов в длину',
        'string.max': 'Название должно быть не более 30 символов в длину',
      }),
    link: Joi.string().uri().required().messages({
      'any.required': 'Поле Ссылка обязательно для заполнения',
      'string.empty': 'Поле Ссылка обязательно для заполнения',
      'string.uri': 'Некорректная ссылка',
    }),
  }),
}), createCard);
router.delete('/:cardId', authMiddleware, cardIdValidator, deleteCard);
router.put('/likes/:cardId', authMiddleware, cardIdValidator, addLike);
router.delete('/likes/:cardId', authMiddleware, cardIdValidator, dislikeLike);

module.exports = router;
