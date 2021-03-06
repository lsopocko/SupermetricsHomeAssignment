import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import "normalize.css";
import "./index.css";
import App from "./App";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import Login from "./routes/Login";
import Posts from "./routes/Posts";
import AuthRoute from "./auth/AuthRoute";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<App />}>
            <Route path="" element={<Navigate to="posts"/>} />
            <Route path="posts" element={
              <AuthRoute>
                <Posts />
              </AuthRoute>
            } />
            <Route path="posts/:authorId" element={
              <AuthRoute>
                <Posts />
              </AuthRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
