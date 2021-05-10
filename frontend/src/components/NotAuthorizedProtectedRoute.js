import {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';

function NotAuthorizedProtectedRoute({component: Component, ...props}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Route>
      {currentUser ? <Redirect to="/" /> : <Component {...props} />}
    </Route>
  );
}

export default NotAuthorizedProtectedRoute;
