import {useContext} from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function HeaderAuthorizedDesktopMenu({onSignOut}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="header__menu header__menu_desktop">
      <p className="header__username">
        {currentUser.email}
      </p>
      <button onClick={onSignOut} type="button" className="header__logout">
        Выйти
      </button>
    </div>
  );
}

export default HeaderAuthorizedDesktopMenu;
