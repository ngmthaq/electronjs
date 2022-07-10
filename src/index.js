import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import theme from "./theme/material";
import store from "./store";
import App from "./App";
import "./theme/styles/index.scss";
import "./language";

const container = document.getElementById("app");
ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>,
  container
);
