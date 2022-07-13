import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Router from "./router";
import { vh } from "./helpers";
import { PrimaryLoading, PrimaryTitleBar } from "./components";

const App = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const { isLoading } = state.common;

  useEffect(() => {
    console.log("State", state);
  }, [state]);

  return (
    <React.Fragment>
      <PrimaryTitleBar />
      <Box className={classes.app}>
        <Router />
        <PrimaryLoading open={isLoading} />
      </Box>
    </React.Fragment>
  );
};

export default App;

const useStyles = makeStyles((theme) => ({
  app: {
    overflow: "auto",
    height: vh(100),
  },
}));
