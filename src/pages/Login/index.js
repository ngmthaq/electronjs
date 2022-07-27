import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { ImageConstant, LangConstant } from "../../const";
import authAction from "../../store/auth/auth.action";
import { getRequiredLabel, vh } from "../../helpers";
import { useValidator } from "../../hooks";
import { Validator } from "../../hooks/useValidator";
import LangDropdown from "./LangDropdown";
import { PrimaryPasswordField } from "../../components";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t: getLabel } = useTranslation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [validator, setValidator, clearValidator] = useValidator({
    form: form,
    rules: [
      Validator.isEmail({ name: "email", input: form.email }),
      Validator.isRequired({ name: "password", input: form.password }),
    ],
  });

  const onInputChange = (e) => {
    setForm((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  const onInputFocus = (e) => {
    clearValidator(e.target.id);
  };

  const onInputBlur = (e) => {
    setValidator(e.target.id);
  };

  const onCheckboxChange = () => {
    let status = !form.remember;
    setForm((state) => ({ ...state, remember: status }));
  };

  const onLogin = (e) => {
    e.preventDefault();
    setValidator();
  };

  return (
    <Grid container className={classes.root}>
      <Grid item md={4} xs={12} className={classes.grid}>
        <Box className={classes.header}>
          <ImageConstant.LogoIcon className={classes.icon} />
          <LangDropdown />
        </Box>
        <Box className={classes.formWrapper}>
          <Box
            component="form"
            className={classes.form}
            id={textFields.form}
            onSubmit={onLogin}
          >
            <Typography className={classes.loginTitle}>
              {getLabel(LangConstant.TXT_LOGIN_TITLE)}
            </Typography>
            <Box className={classes.formControl}>
              <TextField
                fullWidth
                id={textFields.email.id}
                label={getRequiredLabel(LangConstant.L_EMAIL)}
                variant="outlined"
                className={classes.textField}
                value={form.email}
                onChange={onInputChange}
                error={validator?.email?.isFailure || false}
                helperText={validator?.email?.message || ""}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              />
              <PrimaryPasswordField
                fullWidth
                id={textFields.password.id}
                label={getRequiredLabel(LangConstant.L_PASSWORD)}
                variant="outlined"
                className={classes.textField}
                value={form.password}
                onChange={onInputChange}
                error={validator?.password?.isFailure || false}
                helperText={validator?.password?.message || ""}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              />
              <FormControlLabel
                label={getLabel(LangConstant.L_REMEMBER)}
                className={clsx("user-select-none", classes.remember)}
                control={
                  <Checkbox value={form.remember} onChange={onCheckboxChange} />
                }
              />
              <Button variant="contained" size="large" fullWidth type="submit">
                {getLabel(LangConstant.TXT_LOGIN)}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.footer}>
          <Typography>@Copyright. All rights reserved</Typography>
        </Box>
      </Grid>
      <Grid item md={8} xs={12}>
        <CardMedia
          image={ImageConstant.LoginBackgroundImage}
          className={classes.background}
        />
      </Grid>
    </Grid>
  );
};

export default Login;

const textFields = {
  form: "login-form",
  email: {
    id: "email",
    errorId: "email-error",
  },
  password: {
    id: "password",
    errorId: "password-error",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {},

  grid: {
    position: "relative",
    paddingLeft: 40,
    paddingRight: 40,
  },

  background: {
    width: "100%",
    height: vh(100),
  },

  header: {
    paddingTop: 40,
    paddingBottom: 80,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    width: 80,
    height: 80,
  },

  loginTitle: {
    fontSize: 36,
    fontWeight: 900,
    lineHeight: "40px",
    paddingBottom: 40,
  },

  formControl: {
    paddingBottom: 40,
  },

  textField: {
    marginBottom: 20,
  },

  remember: {
    width: "100%",
    marginBottom: 20,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    paddingTop: 40,
    paddingBottom: 40,
    textAlign: "center",
  },
}));
