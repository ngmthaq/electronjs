import React from "react";
import clsx from "clsx";
import StringFormat from "string-format";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";

const PrimaryTextField = ({
  id,
  label,
  placeholder,
  errorMsg,
  variant,
  ...otherProps
}) => {
  const defaultClasses = useStyles();

  return (
    <TextField
      required
      fullWidth
      id={id}
      label={label}
      variant={variant}
      placeholder={placeholder}
      className={classes.textField}
      helperText={errorMsg}
      {...otherProps}
    />
  );
};

export default PrimaryTextField;

const useStyles = makeStyles((theme) => ({}));
