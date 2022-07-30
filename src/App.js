import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Box, useMediaQuery } from "@mui/material";
import Router from "./router";
import { getStorage, setStorage, vh } from "./helpers";
import {
  InitLoading,
  PrimaryLoading,
  PrimaryTitleBar,
  SmallScreenWarning,
} from "./components";
import { KeyConstant, LangConstant } from "./const";

const App = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const isDownLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { isLoading } = state.common;
  const { t: getLabel, i18n } = useTranslation();

  const [isFirstInit, setIsFirstInit] = useState(true);

  useEffect(() => {
    console.log("State", state);
  }, [state]);

  useEffect(() => {
    let lang = getStorage(KeyConstant.LOCAL_STORAGE.lang);
    if (lang && LOCALE_OPTIONS.includes(lang)) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage(LangConstant.VIETNAM_LOCALE);
      setStorage(KeyConstant.LOCAL_STORAGE.lang, LangConstant.VIETNAM_LOCALE);
    }

    let timer = setTimeout(() => {
      setIsFirstInit(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <PrimaryTitleBar />
      <Box className={classes.app}>
        {isDownLg ? <SmallScreenWarning /> : <Router />}
        <PrimaryLoading open={isLoading} />
        <InitLoading open={isFirstInit} />
      </Box>
    </React.Fragment>
  );
};

export default App;

const LOCALE_OPTIONS = [
  LangConstant.VIETNAM_LOCALE,
  LangConstant.ENGLISH_LOCALE,
];

const useStyles = makeStyles((theme) => ({
  app: {
    overflow: "auto",
    height: vh(100),
  },
}));
