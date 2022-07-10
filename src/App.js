import React, { useEffect } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import { Provider } from "react-redux";
import Router from "./router";
import theme from "./theme/material";
import store from "./store";
import "./theme/styles/index.scss";
import "./language";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
