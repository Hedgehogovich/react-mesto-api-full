class IApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
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

  _getJsonFromResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }

    return response.json();
  }

  _getOkStatusFromResponse(response) {
    return response.ok || Promise.reject(`Ошибка: ${response.status}`);
  }
}

export default IApi;
