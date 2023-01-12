import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimationPage from "./pages/AnimationPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function Routing() {
    const loginFlag = true;
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        {loginFlag && <Route exact path="/main" element={<MainPage />} />}
        {loginFlag &&
          <Route exact path="/animation" element={<AnimationPage />} />}
      </Routes>
    </Router>
  );
}

export default Routing;
