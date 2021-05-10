import {useContext} from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function HeaderAuthorizedMobileMenu({isOpened, onSignOut}) {
  const currentUser = useContext(CurrentUserContext);
  const menuClassName = 'header__menu header__menu_mobile'
    + (isOpened ? ' header__menu_mobile_opened' : '');

  return (
    <div id="mobile-menu" className={menuClassName}>
      <p className="header__username">
        {currentUser.email}
      </p>
      <button onClick={onSignOut} type="button" className="header__logout">
        Выйти
      </button>
    </div>
  );
}

export default HeaderAuthorizedMobileMenu;
