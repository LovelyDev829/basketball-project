import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimationPage from "./pages/AnimationPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function Routing({fullScreenHandle}) {
  const loginFlag = true;
  const [fieldLineFlag, setFieldLineFlag] = useState(true);
  const [fullScreenFlag, setFullScreenFlag] = useState(false);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainPage
              fieldLineFlag={fieldLineFlag}
              setFieldLineFlag={setFieldLineFlag}
              fullScreenFlag={fullScreenFlag}
              setFullScreenFlag={setFullScreenFlag}
              fullScreenHandle={fullScreenHandle}
            />
          }
        />
        <Route exact path="/login" element={<LoginPage />} />
        {loginFlag &&
          <Route
            exact
            path="/main"
            element={
              <MainPage
                fieldLineFlag={fieldLineFlag}
                setFieldLineFlag={setFieldLineFlag}
                fullScreenFlag={fullScreenFlag}
                setFullScreenFlag={setFullScreenFlag}
                fullScreenHandle={fullScreenHandle}
              />
            }
          />}
        {loginFlag &&
          <Route
            exact
            path="/animation"
            element={
              <AnimationPage
                fieldLineFlag={fieldLineFlag}
                setFieldLineFlag={setFieldLineFlag}
                fullScreenFlag={fullScreenFlag}
                setFullScreenFlag={setFullScreenFlag}
                fullScreenHandle={fullScreenHandle}
              />
            }
          />}
      </Routes>
    </Router>
  );
}

export default Routing;
