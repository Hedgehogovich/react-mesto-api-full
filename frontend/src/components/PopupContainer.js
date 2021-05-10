import {useEffect} from 'react';

import {ESCAPE_BUTTON_KEY} from '../utils/utils';

function PopupContainer({
  isOpen,
  popupName,
  children,
  onClose,
  wrapperClassName,
  closeButtonClassName,
  isBlackBackground = false,
}) {
  const backgroundClass = isBlackBackground ? ' popup_background_black' : ' popup_background_dark';
  const isOpenClass = isOpen ? ' popup_opened' : '';
  const rootClassName = `popup${backgroundClass} ${popupName}${isOpenClass}`;
  const closeClassName = `popup__close${closeButtonClassName ? ` ${closeButtonClassName}` : ''}`;
  const popupWrapperClassName = `popup__container${wrapperClassName ? ` ${wrapperClassName}` : ''}`;

  function onBackgroundClick({target, currentTarget}) {
    if (target === currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    function onKeyUp({key}) {
      if (key === ESCAPE_BUTTON_KEY) {
        onClose();
      }
    }

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onClose]);

  return (
    <div onClick={onBackgroundClick} className={rootClassName}>
      <div className={popupWrapperClassName}>
        {children}
        <button onClick={onClose} type="button" className={closeClassName} aria-label="Закрыть всплывающее окно" />
      </div>
    </div>
  );
}

export default PopupContainer;
