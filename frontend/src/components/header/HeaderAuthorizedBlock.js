import HeaderAuthorizedDesktopMenu from './HeaderAuthorizedDesktopMenu';

function HeaderAuthorizedBlock({isMobileMenuOpened, onMenuToggle, onSignOut}) {
  const buttonClassName = 'header__menu-toggle header__menu-toggle_mobile'
    + (isMobileMenuOpened ? ' header__menu-toggle_mobile_active' : '');

  return (
    <>
      <HeaderAuthorizedDesktopMenu onSignOut={onSignOut} />
      <button
        type="button"
        onClick={onMenuToggle}
        className={buttonClassName}
        aria-expanded={isMobileMenuOpened}
        aria-controls="mobile-menu"
        aria-label="Открыть меню"
      />
    </>
  );
}

export default HeaderAuthorizedBlock;
