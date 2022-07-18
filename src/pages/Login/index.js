import React, { useEffect } from "react";
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
import { ArrowBack } from "@mui/icons-material";
import { ImageConstant, LangConstant } from "../../const";
import authAction from "../../store/auth/auth.action";
import { vh } from "../../helpers";
import { LangDropdown } from "./components";
import clsx from "clsx";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t: getLabel } = useTranslation();

  useEffect(() => {
    console.log("Login page");
  }, []);

  const onLogin = () => {
    dispatch(authAction.login());
  };

  return (
    <Grid container className={classes.root}>
      <Grid item md={4} xs={12} className={classes.grid}>
        <Box className={classes.header}>
          <ImageConstant.LogoIcon className={classes.icon} />
          <LangDropdown />
        </Box>
        <Box className={classes.formWrapper}>
          <Box component="form" className={classes.form}>
            <Typography className={classes.loginTitle}>
              {getLabel(LangConstant.TXT_LOGIN_TITLE)}
            </Typography>
            <Box className={classes.formControl}>
              <TextField
                required
                fullWidth
                id="username"
                label={getLabel(LangConstant.L_USERNAME)}
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                required
                fullWidth
                id="password"
                label={getLabel(LangConstant.L_PASSWORD)}
                variant="outlined"
                className={classes.textField}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={getLabel(LangConstant.L_REMEMBER)}
                className={clsx("user-select-none", classes.remember)}
              />
              <Button variant="contained" size="large" fullWidth>
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
