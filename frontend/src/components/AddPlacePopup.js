import PopupWithForm from './PopupWithForm';
import UiInput from './form/UiInput';

function AddPlacePopup({isOpen, onClose, isLoading, onAddPlace}) {
  function handleFormSubmit(formData) {
    onAddPlace(formData);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <UiInput
        id="place-name"
        name="name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <UiInput
        id="picture"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
