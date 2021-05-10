import FetchError from './FetchError';

class IApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._makeRequest = this._makeRequest.bind(this);
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
      credentials: 'include'
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
