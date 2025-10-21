import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./testApi.js";
import "./testStorageAPI.js";

import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { AppRouter } from "./routes/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);

console.log(store.getState());
