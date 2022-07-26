import React, { useState } from "react";
import clsx from "clsx";
import StringFormat from "string-format";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PrimaryPasswordField = ({
  id,
  label,
  placeholder,
  errorMsg,
  variant,
  className,
  classes,
  ...otherProps
}) => {
  const defaultClasses = useStyles();

  const [type, setType] = useState("password");

  const onOpenPasswordType = () => {
    setType("password");
  };

  const onOpenTextType = () => {
    setType("text");
  };

  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      variant={variant}
      placeholder={placeholder}
      className={clsx(classes.textField, className)}
      classes={classes}
      helperText={errorMsg}
      {...otherProps}
      type={type}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {type === "password" ? (
              <Visibility
                onClick={onOpenTextType}
                className={defaultClasses.icon}
              />
            ) : (
              <VisibilityOff
                onClick={onOpenPasswordType}
                className={defaultClasses.icon}
              />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PrimaryPasswordField;

PrimaryPasswordField.propTypes = {
  id: PropTypes.string.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,

  classes: PropTypes.object,
};

PrimaryPasswordField.defaultProps = {
  label: "",
  placeholder: "",
  errorMsg: "",
  variant: "",
  className: "",

  classes: {},
};

const useStyles = makeStyles((theme) => ({
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.common.black,
    },
  },
}));
