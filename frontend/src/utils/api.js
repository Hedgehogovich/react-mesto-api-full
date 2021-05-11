import IApi from './IApi';
import {BASE_API_URL} from './constants';

class Api extends IApi {
  getCards() {
    return this._makeAuthorizedRequest({
      action: '/cards',
    }).then(this._getJsonFromResponse);
  }

  updateProfile({name, about}) {
    return this._makeAuthorizedRequest({
      action: '/users/me',
      method: 'PATCH',
      data: {name, about},
    }).then(this._getJsonFromResponse);
  }

  addCard({name, link}) {
    return this._makeAuthorizedRequest({
      action: '/cards',
      method: 'POST',
      data: {name, link},
    }).then(this._getJsonFromResponse);
  }

  removeCard(cardId) {
    return this._makeAuthorizedRequest({
      action: `/cards/${cardId}`,
      method: 'DELETE',
    }).then(this._getOkStatusFromResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked
      ? this.removeLikeFromCard(cardId)
      : this.likeCard(cardId);
  }

  likeCard(cardId) {
    return this._makeAuthorizedRequest({
      action: `/cards/likes/${cardId}`,
      method: 'PUT',
    }).then(this._getJsonFromResponse);
  }

  removeLikeFromCard(cardId) {
    return this._makeAuthorizedRequest({
      action: `/cards/likes/${cardId}`,
      method: 'DELETE',
    }).then(this._getJsonFromResponse);
  }

  updateAvatar(avatar) {
    return this._makeAuthorizedRequest({
      action: `/users/me/avatar`,
      method: 'PATCH',
      data: {avatar}
    }).then(this._getJsonFromResponse);
  }
}

export const api = new Api({
  baseUrl: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
