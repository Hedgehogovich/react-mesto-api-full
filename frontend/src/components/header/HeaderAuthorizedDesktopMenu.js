import {useContext} from 'react';

import CurrentUserEmailContext from '../../contexts/CurrentUserEmailContext';

function HeaderAuthorizedDesktopMenu({onSignOut}) {
  const currentUserEmail = useContext(CurrentUserEmailContext);

  return (
    <div className="header__menu header__menu_desktop">
      <p className="header__username">
        {currentUserEmail}
      </p>
      <button onClick={onSignOut} type="button" className="header__logout">
        Выйти
      </button>
    </div>
  );
}

export default HeaderAuthorizedDesktopMenu;
