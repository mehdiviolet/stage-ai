// src/ThemedApp.jsx
import { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectTheme } from "./features/settings/settingsSlice";
import { lightTheme, darkTheme } from "./styles/theme";

/**
 * Wrapper che applica il tema dinamico
 * basato sulle impostazioni Redux
 */
export function ThemedApp({ children }) {
  const themeMode = useSelector(selectTheme);

  // Determina quale tema usare
  const theme = useMemo(() => {
    if (themeMode === "dark") {
      return darkTheme;
    }

    if (themeMode === "auto") {
      // Rileva preferenza sistema
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? darkTheme : lightTheme;
    }

    // Default: light
    return lightTheme;
  }, [themeMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
