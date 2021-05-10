import {useContext, useEffect, useState} from 'react';

import PopupWithForm from './PopupWithForm';

import UiInput from './form/UiInput';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = useContext(CurrentUserContext);
  const [controlledValues, setControlledValues] = useState({name: '', about: ''});

  function handleSubmit(formData) {
    onUpdateUser(formData);
  }

  useEffect(() => {
    if (currentUser) {
      setControlledValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser])

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isLoading={isLoading}
      isOpen={isOpen}
      controlledValues={controlledValues}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <UiInput
        id="name"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        required
      />
      <UiInput
        id="about"
        name="about"
        type="text"
        minLength="2"
        maxLength="200"
        required
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
