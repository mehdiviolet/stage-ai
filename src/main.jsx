// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouter } from "./routes";
import { ThemedApp } from "./ThemeApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemedApp>
        <CssBaseline />
        <AppRouter />
      </ThemedApp>
    </Provider>
  </StrictMode>
);
