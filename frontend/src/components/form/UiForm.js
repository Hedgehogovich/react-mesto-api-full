import {Children, createElement, forwardRef} from 'react';
import FormThemeContext from '../../contexts/FormThemeContext';
import {FORM_WHITE_THEME} from '../../utils/constants';

function UiForm({
  children,
  name,
  title,
  submitButtonText,
  loadingInProgressText,
  isLoading,
  isValid,
  isDirty,
  validationMessages,
  dirtyFields,
  className = '',
  theme = FORM_WHITE_THEME,
  onSubmit,
}, ref) {
  const isError = isDirty && !isValid;
  const submitButtonClassName = `edit-form__submit edit-form__submit_theme_${theme}${isError ? ' edit-form__submit_disabled' : ''}`;
  const formClassName = `edit-form edit-form_theme_${theme}${className ? ` ${className}` : ''}`;
  const formTitleClassName = `edit-form__title edit-form__title_theme_${theme}`;

  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      name={name}
      className={formClassName}
      noValidate
    >
      <h2 className={formTitleClassName}>
        {title}
      </h2>
      <FormThemeContext.Provider value={theme}>
        {Children.map(children, child => createElement(child.type, {
          ...child.props,
          error: validationMessages?.[child.props.name] || null,
          isDirty: dirtyFields?.[child.props.name] || false,
          key: child.props.name,
        }))}
      </FormThemeContext.Provider>
      <button
        className={submitButtonClassName}
        disabled={isError || isLoading}
        type="submit"
      >
        {isLoading ? loadingInProgressText : submitButtonText}
      </button>
    </form>
  );
}

export default forwardRef(UiForm);
