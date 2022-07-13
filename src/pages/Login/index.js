import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowBack } from "@mui/icons-material";
import { ImageConstant, LangConstant } from "../../const";
import authAction from "../../store/auth/auth.action";
import { vh } from "../../helpers";
import { LangDropdown } from "./components";

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
      <Grid item md={3} xs={12}>
        <Box className={classes.header}>
          <ImageConstant.LogoIcon classNam={classes.icon} />
          <LangDropdown />
        </Box>
        <Box className={classes.formWrapper}>
          <Box component="form" classes={classes.form}></Box>
        </Box>
        <Box className={classes.footer}>
          <Typography></Typography>
        </Box>
      </Grid>
      <Grid item md={9} xs={12}>
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
  background: {
    width: "100%",
    height: vh(110),
  },
}));
