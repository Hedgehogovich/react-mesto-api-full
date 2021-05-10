import UiForm from './form/UiForm';
import UiInput from './form/UiInput';

import useForm from '../hooks/useForm';

import {FORM_DARK_THEME} from '../utils/utils';

function Login({className, onSubmit, isLoading}) {
  const {
    ref,
    isValid,
    isDirty,
    dirtyFields,
    validationMessages,
    handleSubmit,
  } = useForm();
  const mainClassName = `unauthorized-form${className ? ` ${className}` : ''}`;

  return (
    <main className={mainClassName}>
      <UiForm
        name="login"
        title="Вход"
        submitButtonText="Войти"
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
          autoComplete="email"
          required
        />
        <UiInput
          name="password"
          id="password"
          placeholder="Пароль"
          type="password"
          autoComplete="current-password"
          required
        />
      </UiForm>
    </main>
  );
}

export default Login;
