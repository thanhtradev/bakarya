import { TextField } from "@mui/material";
import React from "react";

export default function ValidateInput(props) {
  return (
    <TextField
      margin='normal'
      required
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus ?? false}
      value={props.enteredValue}
      onChange={props.inputChangeHandler}
      onBlur={props.inputBlurHandler}
      helperText={`${
        props.hasError ? props.errorMsg ?? "" : props.helperText ?? ""
      }`}
      error={props.hasError}
      type={props.type}
    />
  );
}
