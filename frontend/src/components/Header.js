import {useContext, useState} from 'react';

import HeaderUnauthorizedLink from './header/HeaderUnauthorizedLink';
import HeaderAuthorizedBlock from './header/HeaderAuthorizedBlock';
import HeaderLogo from './header/HeaderLogo';
import HeaderAuthorizedMobileMenu from './header/HeaderAuthorizedMobileMenu';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Header({onSignOut}) {
  const currentUser = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function handleMobileMenuToggle() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleSignOut() {
    setIsMobileMenuOpened(false);
    onSignOut();
  }

  return (
    <>
      {currentUser && (
        <HeaderAuthorizedMobileMenu
          onSignOut={handleSignOut}
          isOpened={isMobileMenuOpened}
        />
      )}
      <header className="header page__header">
        <HeaderLogo/>
        {
          currentUser
            ? <HeaderAuthorizedBlock
                onSignOut={handleSignOut}
                isMobileMenuOpened={isMobileMenuOpened}
                onMenuToggle={handleMobileMenuToggle}
              />
            : <HeaderUnauthorizedLink/>
        }
      </header>
    </>
  );
}

export default Header;
