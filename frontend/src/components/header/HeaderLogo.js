import {Link, useLocation} from 'react-router-dom';

function HeaderLogo() {
  const location = useLocation();

  return location.pathname === '/'
      ? <div className="header__logo header__logo_static" />
      : <Link to="/" className="header__logo header__logo_link" />;
}

export default HeaderLogo;
