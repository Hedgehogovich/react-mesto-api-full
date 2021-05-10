import {Link} from 'react-router-dom';

import UiForm from './form/UiForm';
import UiInput from './form/UiInput';

import useForm from '../hooks/useForm';

import {FORM_DARK_THEME} from '../utils/utils';

function Register({onSubmit, isLoading}) {
  const {
    ref,
    isValid,
    isDirty,
    dirtyFields,
    validationMessages,
    handleSubmit,
  } = useForm();

  return (
    <main className="unauthorized-form page__form">
      <UiForm
        name="register"
        title="Регистрация"
        submitButtonText="Зарегистрироваться"
        loadingInProgressText="Подождите"
        isLoading={isLoading}
        ref={ref}
        isValid={isValid}
        isDirty={isDirty}
        dirtyFields={dirtyFields}
        validationMessages={validationMessages}
        onSubmit={handleSubmit(onSubmit)}
        className="unauthorized-form__form"
        theme={FORM_DARK_THEME}
      >
        <UiInput
          name="email"
          id="email"
          placeholder="Email"
          type="email"
          required
        />
        <UiInput
          name="password"
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Пароль"
          required
        />
      </UiForm>
      <Link to="/sign-in" className="unauthorized-form__link">
        Уже зарегистрированы? Войти
      </Link>
    </main>
  );
}

export default Register;
