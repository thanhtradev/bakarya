import { useState } from "react";

const useValidInput = (validateHandler) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateHandler(enteredValue);
  const hasError = !valueIsValid && isTouched; //? hasError === true only value is not valid and not touched

  const inputChangeHandler = (event) => {
    setIsTouched(true);
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    //? if blurred = touched
    setIsTouched(true);
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
    reset,
  };
};

export default useValidInput;
