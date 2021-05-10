import {useContext} from 'react';

import CurrentUserEmailContext from '../../contexts/CurrentUserEmailContext';

function HeaderAuthorizedMobileMenu({isOpened, onSignOut}) {
  const currentUserEmail = useContext(CurrentUserEmailContext);
  const menuClassName = 'header__menu header__menu_mobile'
    + (isOpened ? ' header__menu_mobile_opened' : '');

  return (
    <div id="mobile-menu" className={menuClassName}>
      <p className="header__username">
        {currentUserEmail}
      </p>
      <button onClick={onSignOut} type="button" className="header__logout">
        Выйти
      </button>
    </div>
  );
}

export default HeaderAuthorizedMobileMenu;
