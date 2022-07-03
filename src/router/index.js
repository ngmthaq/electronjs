import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute } from "./components";
import NotFound from "../pages/NotFound";

const Router = () => {
  useEffect(() => {
    console.log("Router is running");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default Router;
