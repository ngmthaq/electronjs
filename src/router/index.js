import React, { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { PathConstant } from "../const";
import AuthRoute from "./AuthRoute";
import Error from "../pages/Error";
import Login from "../pages/Login";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={PathConstant.ROOT} element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
