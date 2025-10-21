// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // ← NUOVO
import { store } from "./app/store"; // ← NUOVO
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouter } from "./routes";
// import { theme } from "./styles/theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux Provider - Wrapper più esterno */}
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <AppRouter />
      {/* </ThemeProvider> */}
    </Provider>
  </StrictMode>
);
