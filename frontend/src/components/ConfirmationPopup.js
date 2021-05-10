import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({isOpen, onClose, onConfirmation, isLoading}) {
  function handleSubmit() {
    onConfirmation();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Да"
    />
  )
}

export default ConfirmationPopup;
