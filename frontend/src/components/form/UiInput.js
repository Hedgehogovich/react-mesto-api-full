import {useContext} from 'react';

import FormThemeContext from '../../contexts/FormThemeContext';

function UiInput({
  name,
  id,
  isDirty,
  error,
  className = '',
  ...restAttributes
}) {
  const formTheme = useContext(FormThemeContext);
  const fieldClassName = `edit-form__field edit-form__field_theme_${formTheme}`;
  const inputClass = `edit-form__input edit-form__input_theme_${formTheme}${className ? ` ${className}` : ''}`
  const errorBlockClass = `edit-form__error${error && isDirty ? ' edit-form__error_visible' : ''}`;

  return (
    <label htmlFor={id} className={fieldClassName}>
      <input
        id={id}
        name={name}
        className={inputClass}
        aria-describedby={`${id}-error`}
        {...restAttributes}
      />
      <span id={`${id}-error`} className={errorBlockClass}>
        {error}
      </span>
    </label>
  );
}

export default UiInput;
