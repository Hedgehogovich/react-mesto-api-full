import {useContext} from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && card.owner === currentUser._id;
  const isLiked = currentUser && card.likes.includes(currentUser._id);
  const likeButtonClassName = `card__like${isLiked ? ' card__like_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike({card, isLiked});
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="gallery__grid-item">
      <figure className="card">
        <img onClick={handleClick} src={card.link} alt={card.name} className="card__image" />
        {isOwn && (
          <button
            onClick={handleCardDelete}
            className="card__delete"
            type="button"
            aria-label="Удалить фотографию"
          />
        )}
        <figcaption className="card__caption">
          <h2 className="card__name">
            {card.name}
          </h2>
          <div className="card__likes">
            <button
              onClick={handleLikeClick}
              className={likeButtonClassName}
              type="button"
              aria-label="Поставить отметку нравится для фотографии"
            />
            <p className="card__likes-count">
              {card.likes.length}
            </p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;
