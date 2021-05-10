import {useCallback, useEffect, useRef, useState} from 'react';

const observerOptions = {childList: true};

function useForm() {
  const ref = useRef();
  const [inputs, setInputs] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [state, setState] = useState({});
  const [validationMessages, setValidationMessages] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  function handleChildrenChange() {
    setInputs(getFormInputs(ref.current));
  }

  function updateIsValid() {
    setIsValid(ref.current.checkValidity());
  }

  function setDirtyFieldValue(input, value) {
    setDirtyFields(s => ({...s, [input.name]: value}));
  }

  function setValidationMessageValue(input) {
    setValidationMessages(s => ({...s, [input.name]: input.validationMessage}));
  }

  function setStateValue(input, value) {
    setState(s => ({...s, [input.name]: value}));
  }

  const mutationObserver = useRef(new MutationObserver(handleChildrenChange));

  const updateValidation = useCallback((targetInput) => {
    updateIsValid();
    if (targetInput) {
      setValidationMessageValue(targetInput);
    } else {
      inputs.forEach(inputItem => {
        setValidationMessageValue(inputItem);
      });
    }
  }, [inputs]);

  const setFormDirty = useCallback((value, targetInput) => {
    setIsDirty(value);
    if (targetInput) {
      setDirtyFieldValue(targetInput, value);
    } else {
      inputs.forEach(inputItem => {
        setDirtyFieldValue(inputItem, value);
      });
    }
  }, [inputs]);

  const triggerValidation = useCallback((targetInput) => {
    updateValidation(targetInput);
    setFormDirty(true, targetInput);
  }, [setFormDirty, updateValidation]);

  const reset = useCallback((defaultValues) => {
    inputs.forEach(input => {
      const defaultValue = defaultValues?.[input.name] || '';

      input.value = defaultValue;
      setStateValue(defaultValue);
    });

    updateValidation();
    setFormDirty(false);
  }, [inputs, setFormDirty, updateValidation]);

  function getFormInputs(form) {
    return Array.from(form.elements).filter(formElement => formElement instanceof HTMLInputElement);
  }

  function handleSubmit(callback) {
    return (evt) => {
      evt.preventDefault();

      if (!isValid) {
        triggerValidation();
        return;
      }

      callback(state);
    };
  }

  useEffect(() => {
    const {current: form} = ref;
    const {current: observer} = mutationObserver;

    if (form && observer) {
      setInputs(getFormInputs(form));
      observer.observe(form, observerOptions);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, mutationObserver]);

  useEffect(() => {
    function handleInput({target: input}) {
      setStateValue(input, input.value);
      triggerValidation(input);
    }

    inputs.forEach(input => {
      input.addEventListener('input', handleInput);
      setStateValue(input, '');
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('input', handleInput);

        setState(s => {
          const stateCopy = {...s};
          delete stateCopy[input.name];
          return stateCopy;
        });

        setValidationMessages(s => {
          const stateCopy = {...s};
          delete stateCopy[input.name];
          return stateCopy;
        });

        setDirtyFields(s => {
          const stateCopy = {...s};
          delete stateCopy[input.name];
          return stateCopy;
        });
      });
    };
  }, [inputs, triggerValidation]);

  return {
    ref,
    dirtyFields,
    validationMessages,
    isValid,
    isDirty,
    handleSubmit,
    reset,
  };
}

export default useForm;
