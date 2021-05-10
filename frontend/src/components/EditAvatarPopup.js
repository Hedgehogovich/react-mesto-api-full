import PopupWithForm from './PopupWithForm';
import UiInput from './form/UiInput';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  function handleFormSubmit(formData) {
    onUpdateAvatar(formData.avatar);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <UiInput
        id="avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
