import FetchError from './FetchError';
import {JWT_SESSION_NAME} from './constants';

class IApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._makeRequest = this._makeRequest.bind(this);
    this._makeAuthorizedRequest = this._makeAuthorizedRequest.bind(this);
    this._getJsonFromResponse = this._getJsonFromResponse.bind(this);
    this._getOkStatusFromResponse = this._getOkStatusFromResponse.bind(this);
    this._formError = this._formError.bind(this);
  }

  _makeRequest({
    action,
    method = 'GET',
    headers = {},
    data = null,
  }) {
    if (!action) {
      return Promise.reject('Не передано адреса запроса');
    }

    const requestParams = {
      method,
      headers: {...this._headers, ...headers},
    };

    let url = this._baseUrl + action;

    if (data) {
      if (method === 'GET') {
        url += new URLSearchParams(data).toString();
      } else {
        requestParams.body = JSON.stringify(data);
      }
    }

    return fetch(url, requestParams);
  }

  _makeAuthorizedRequest({
    action,
    method = 'GET',
    headers = {},
    data = null,
  }) {
    if (!headers.authorization) {
      const token = localStorage.getItem(JWT_SESSION_NAME);

      if (token) {
        headers.authorization = `Bearer ${token}`;
      }
    }

    return this._makeRequest({action, method, headers, data});
  }

  _getJsonFromResponse(response) {
    if (!response.ok) {
      return this._formError(response);
    }

    return response.json().then(({data}) => data);
  }

  _getOkStatusFromResponse(response) {
    return response.ok || this._formError(response);
  }

  _formError(response) {
    return response.json().then(({message}) => Promise.reject(new FetchError(response.status, message)));
  }
}

export default IApi;
