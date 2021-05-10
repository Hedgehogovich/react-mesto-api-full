import PopupContainer from './PopupContainer';

function ImagePopup({card, onClose}) {
  return (
    <PopupContainer
      popupName="zoom-preview"
      isBlackBackground={true}
      isOpen={!!card}
      onClose={onClose}
    >
      <figure className="zoom-preview__wrapper">
        <img src={card?.link} alt={card?.name} className="zoom-preview__image" />
        <figcaption className="zoom-preview__caption">
          {card?.name}
        </figcaption>
      </figure>
    </PopupContainer>
  );
}

export default ImagePopup;
