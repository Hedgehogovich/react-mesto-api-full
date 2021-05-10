import {useContext} from 'react';

import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__section page__main">
      <section className="profile page__profile">
        {currentUser && (
          <div className="profile__user">
            <div className="profile__avatar">
              <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar-image" />
              <div onClick={onEditAvatar} className="profile__avatar-overlay" />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">
                {currentUser.name}
              </h1>
              <button onClick={onEditProfile} type="button" className="profile__edit" aria-label="Редактировать профиль" />
              <p className="profile__about">
                {currentUser.about}
              </p>
            </div>
          </div>
        )}
        <button onClick={onAddPlace} type="button" className="profile__add" aria-label="Добавить изображение" />
      </section>
      <section className="gallery">
        <ul className="gallery__grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
