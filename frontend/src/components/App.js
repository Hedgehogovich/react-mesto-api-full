import {useState, useEffect, useCallback} from 'react';
import {Switch, useHistory} from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import NotAuthorizedProtectedRoute from './NotAuthorizedProtectedRoute';
import InfoTooltip from './InfoTooltip';

import CurrentUserContext from '../contexts/CurrentUserContext';

import {api} from '../utils/api/api';
import {authApi} from '../utils/api/authApi';

import {BAD_REQUEST, CONFLICT, UNAUTHORIZED} from '../utils/httpStatuses';
import {JWT_SESSION_NAME} from '../utils/constants';

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPlaceAdding, setIsPlaceAdding] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);

  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [isConfirmationRequestInProgress, setIsConfirmationRequestInProgress] = useState(false);

  const [isLikeRequestInProcess, setIsLikeRequestInProcess] = useState(false);

  const [selectedPreviewCard, setSelectedPreviewCard] = useState(null);

  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const [isTooltipSuccessful, setIsTooltipSuccessful] = useState(false);

  const [isRegisterRequestInProcess, setIsRegisterRequestInProcess] = useState(false);
  const [isLoginRequestInProcess, setIsLoginRequestInProcess] = useState(false);

  const [isInitialLoadPerformed, setIsInitialLoadPerformed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  function resetAuthorization() {
    localStorage.removeItem(JWT_SESSION_NAME);
    setCurrentUser(null);
    setCards([]);
  }

  function handleRequestError(error) {
    setIsTooltipSuccessful(false);
    switch (error.status) {
      case BAD_REQUEST:
      case CONFLICT:
        setInfoTooltipMessage(error.message);
        break;
      default:
        console.error(error);
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        break;
    }
  }

  const handleAuthorizedRouteRequestError = useCallback((error) => {
    if (error.status === UNAUTHORIZED) {
      resetAuthorization();
    } else {
      handleRequestError(error);
    }
  }, []);

  function handleGuestRouteRequestError(error) {
    if (error.status === UNAUTHORIZED) {
      setIsTooltipSuccessful(false);
      setInfoTooltipMessage(error.message);
    } else {
      handleRequestError(error);
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedPreviewCard(card);
  }

  function handleUpdateProfile(userData) {
    if (isProfileUpdating) {
      return;
    }

    setIsProfileUpdating(true);
    api.updateProfile(userData)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch(handleAuthorizedRouteRequestError)
      .finally(() => setIsProfileUpdating(false));
  }

  function handleUpdateAvatar(avatar) {
    if (isAvatarUpdating) {
      return;
    }

    setIsAvatarUpdating(true);
    api.updateAvatar(avatar)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(handleAuthorizedRouteRequestError)
      .finally(() => setIsAvatarUpdating(false));
  }

  function handleAddPlace(cardData) {
    if (isPlaceAdding) {
      return;
    }

    setIsPlaceAdding(true);

    api.addCard(cardData)
      .then(newCardData => {
        setCards(state => [newCardData, ...state]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(handleAuthorizedRouteRequestError)
      .finally(() => setIsPlaceAdding(false));
  }

  function handleCardLike({card, isLiked}) {
    if (isLikeRequestInProcess) {
      return;
    }

    setIsLikeRequestInProcess(true);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(updatedCardData => {
        const {_id: cardId} = updatedCardData;

        setCards(state => {
          return state.map(stateCard => stateCard._id === cardId ? updatedCardData : stateCard);
        });
      })
      .catch(handleAuthorizedRouteRequestError)
      .finally(() => setIsLikeRequestInProcess(false));
  }

  function handleConfirmation() {
    if (isConfirmationRequestInProgress) {
      return;
    }

    setIsConfirmationRequestInProgress(true);
    confirmationCallback();
  }

  function handleCardDeleteConfirmation(card) {
    const {_id: cardId} = card;

    return api.removeCard(cardId)
      .then(() => {
        setCards(state => {
          return state.filter(stateCard => stateCard._id !== cardId);
        });
        setConfirmationCallback(null);
      })
      .catch(handleAuthorizedRouteRequestError)
      .finally(() => setIsConfirmationRequestInProgress(false));
  }

  function handleCardDelete(card) {
    setConfirmationCallback(() => () => handleCardDeleteConfirmation(card));
  }

  function handleRegistrationSuccess(message) {
    setInfoTooltipMessage(message);
    setIsTooltipSuccessful(true);
  }

  function handleRegistration(formData) {
    if (isRegisterRequestInProcess) {
      return;
    }

    setIsRegisterRequestInProcess(true);

    authApi.signUp(formData)
      .then(({message}) => {
        handleRegistrationSuccess(message);
        history.push('/sign-in');
      })
      .catch(handleGuestRouteRequestError)
      .finally(() => setIsRegisterRequestInProcess(false));
  }

  const authorizeUser = useCallback((token) => {
    if (!token) {
      token = localStorage.getItem(JWT_SESSION_NAME)
    }

    if (token) {
      authApi.getUser(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsInitialLoadPerformed(true);
        })
        .catch(resetAuthorization)
        .finally(() => {
          setIsLoginRequestInProcess(false);
        });
    } else {
      setIsInitialLoadPerformed(true);
    }
  }, []);

  function handleLogin(formData) {
    if (isLoginRequestInProcess) {
      return;
    }

    setIsLoginRequestInProcess(true);

    authApi.signIn(formData)
      .then(({token}) => {
        localStorage.setItem(JWT_SESSION_NAME, token);
        authorizeUser(token);
      })
      .catch((error) => {
        handleGuestRouteRequestError(error);
        setIsLoginRequestInProcess(false)
      });
  }

  function handleSignOutConfirmation() {
    setConfirmationCallback(null);
    setIsConfirmationRequestInProgress(false);
    resetAuthorization();
  }

  function handleSignOut() {
    setConfirmationCallback(() => handleSignOutConfirmation);
  }

  function closeNotification() {
    setInfoTooltipMessage('');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedPreviewCard(null);
    setInfoTooltipMessage('');
    setConfirmationCallback(null);
  }

  useEffect(() => {
    authorizeUser();
  }, [authorizeUser]);

  useEffect(() => {
    if (currentUser) {
      api.getCards()
        .then(setCards)
        .catch(handleAuthorizedRouteRequestError);
    }
  }, [currentUser, handleAuthorizedRouteRequestError]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header onSignOut={handleSignOut} />
          {isInitialLoadPerformed && (
            <Switch>
              <ProtectedRoute
                component={Main}
                path="/"
                exact
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards}
              />
              <NotAuthorizedProtectedRoute
                component={Login}
                path="/sign-in"
                onSubmit={handleLogin}
                isLoading={isLoginRequestInProcess}
                className="page__form"
              />
              <NotAuthorizedProtectedRoute
                component={Register}
                path="/sign-up"
                onSubmit={handleRegistration}
                isLoading={isRegisterRequestInProcess}
                className="page__form"
              />
            </Switch>
          )}
          {currentUser && <Footer />}
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateProfile}
          isLoading={isProfileUpdating}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isPlaceAdding}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isAvatarUpdating}
        />
        <ConfirmationPopup
          isOpen={!!confirmationCallback}
          onClose={closeAllPopups}
          onConfirmation={handleConfirmation}
          isLoading={isConfirmationRequestInProgress}
        />
        <ImagePopup
          card={selectedPreviewCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          message={infoTooltipMessage}
          onClose={closeNotification}
          isSuccessful={isTooltipSuccessful}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
