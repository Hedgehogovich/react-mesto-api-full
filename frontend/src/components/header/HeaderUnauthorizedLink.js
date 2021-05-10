import {Link, useLocation} from 'react-router-dom';

function HeaderUnauthorizedLink() {
  const location = useLocation();
  const routeObject = {text: '', path: ''};

  if (location.pathname === '/sign-in') {
    routeObject.text = 'Регистрация';
    routeObject.path = '/sign-up';
  } else if (location.pathname === '/sign-up') {
    routeObject.text = 'Войти';
    routeObject.path = '/sign-in';
  }

  return (
    <Link to={routeObject.path} className="header__unauthorized-link">
      {routeObject.text}
    </Link>
  );
}

export default HeaderUnauthorizedLink;
