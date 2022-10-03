import { useState } from "react";

const useValidInput = (validateHandler) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateHandler(enteredValue);

  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setIsTouched(true);
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(false);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
  };
};

export default useValidInput;
