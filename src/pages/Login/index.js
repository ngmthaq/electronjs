import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowBack } from "@mui/icons-material";
import { ImageConstant, LangConstant } from "../../constants";
import authAction from "../../store/auth/auth.action";

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
      <Grid item md={6} xs={12}></Grid>
      <Grid item md={6} xs={12}>
        <ImageConstant.LogoIcon classNam={classes.icon} />
        <button onClick={onLogin}>Login</button>
      </Grid>
    </Grid>
  );
};

export default Login;

const useStyles = makeStyles((theme) => ({
  root: {},
}));
