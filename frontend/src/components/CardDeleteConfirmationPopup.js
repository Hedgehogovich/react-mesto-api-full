import PopupWithForm from './PopupWithForm';

function CardDeleteConfirmationPopup({isOpen, onClose, onCardDeleteConfirmation, isLoading}) {
  function handleSubmit() {
    onCardDeleteConfirmation();
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

export default CardDeleteConfirmationPopup;
