import PopupContainer from './PopupContainer';

function InfoTooltip({onClose, isSuccessful, message}) {
  const icoInfoClass = isSuccessful ? 'info-tooltip__ico_type_success' : 'info-tooltip__ico_type_error';
  const icoClassName = `info-tooltip__ico ${icoInfoClass}`;

  return (
    <PopupContainer
      onClose={onClose}
      isOpen={!!message}
      popupName="info-tooltip"
      wrapperClassName="info-tooltip__container"
      closeButtonClassName="info-tooltip__close"
    >
      <div className={icoClassName}/>
      <p className="info-tooltip__text">
        {message}
      </p>
    </PopupContainer>
  );
}

export default InfoTooltip;
