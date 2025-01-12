import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
