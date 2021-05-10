import {useEffect} from 'react';

import PopupContainer from './PopupContainer';
import UiForm from './form/UiForm';

import useForm from '../hooks/useForm';

import {FORM_WHITE_THEME} from '../utils/utils';

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  children,
  controlledValues,
  submitButtonText = 'Сохранить'
}) {
  const {
    ref,
    isValid,
    isDirty,
    dirtyFields,
    validationMessages,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset(controlledValues ? {...controlledValues} : undefined);
  }, [reset, controlledValues, isOpen]);

  return (
    <PopupContainer
      isOpen={isOpen}
      popupName={`${name}-popup`}
      wrapperClassName="popup__container_form"
      onClose={onClose}
    >
      <UiForm
        ref={ref}
        name={name}
        title={title}
        isValid={isValid}
        isDirty={isDirty}
        dirtyFields={dirtyFields}
        validationMessages={validationMessages}
        theme={FORM_WHITE_THEME}
        className="popup__form"
        onSubmit={handleSubmit(onSubmit)}
        submitButtonText={submitButtonText}
        isLoading={isLoading}
        loadingInProgressText="Сохранение..."
      >
        {children}
      </UiForm>
    </PopupContainer>
  );
}

export default PopupWithForm;
