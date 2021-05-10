import IApi from './IApi';
import {BASE_API_URL} from './constants';

class AuthApi extends IApi{
  signIn({email, password}) {
    return this._makeRequest({
      action: '/signin',
      method: 'POST',
      data: {email, password}
    }).then(this._getOkStatusFromResponse);
  }

  signUp({email, password}) {
    return this._makeRequest({
      action: '/signup',
      method: 'POST',
      data: {email, password}
    }).then(this._getOkStatusFromResponse);
  }

  getUser() {
    return this._makeRequest({
      action: '/users/me',
    }).then(this._getJsonFromResponse);
  }

  signOut() {
    return this._makeRequest({
      action: '/signout',
      method: 'POST'
    });
  }
}

export const authApi = new AuthApi({
  baseUrl: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
