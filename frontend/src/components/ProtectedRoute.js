import {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';

function ProtectedRoute({component: Component, ...props}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Route>
      {currentUser ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;
