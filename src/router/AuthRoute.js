import React from "react";
import { Route } from "react-router-dom";

const AuthRoute = (props) => {
  const { ...otherProps } = props;

  return <Route {...props} />;
};

export default AuthRoute;
