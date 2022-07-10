import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "./router";
import PrimaryLoading from "./components/PrimaryLoading";

const App = () => {
  const state = useSelector((state) => state);
  const { isLoading } = state.common;

  useEffect(() => {
    console.log("State", state);
  }, [state]);

  return (
    <React.Fragment>
      <Router />
      <PrimaryLoading open={isLoading} />
    </React.Fragment>
  );
};

export default App;
