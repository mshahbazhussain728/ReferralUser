import "./index.css";
import React from "react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./api/store.js";
import { BrowserRouter } from "react-router-dom";
import { ModalManager } from "./components/modalManager/modal-manager.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ModalManager />
      <App />
    </BrowserRouter>
  </Provider>
);
