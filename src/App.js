import React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import Router from "./router";
import theme from "./theme/material";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
