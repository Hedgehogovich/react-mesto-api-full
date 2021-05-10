import PopupContainer from './PopupContainer';

function InfoTooltip({onClose, isOpen, isSuccessful}) {
  const registrationFinishData = isSuccessful
    ? {icoClass: 'info-tooltip__ico_type_success', text: 'Вы успешно зарегистрировались!'}
    : {icoClass: 'info-tooltip__ico_type_error', text: 'Что-то пошло не так! Попробуйте ещё раз.'};
  const icoClassName = `info-tooltip__ico ${registrationFinishData.icoClass}`;

  return (
    <PopupContainer
      onClose={onClose}
      isOpen={isOpen}
      popupName="info-tooltip"
      wrapperClassName="info-tooltip__container"
      closeButtonClassName="info-tooltip__close"
    >
      <div className={icoClassName}/>
      <p className="info-tooltip__text">
        {registrationFinishData.text}
      </p>
    </PopupContainer>
  );
}

export default InfoTooltip;
