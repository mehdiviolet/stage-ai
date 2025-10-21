import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Toolbar } from "@mui/material";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

/**
 * AppLayout - Layout principale dell'applicazione
 * Compone Header, Sidebar e area contenuto principale
 *
 * @param {ReactNode} children - Contenuto principale (le pagine)
 */
export function AppLayout({ children }) {
  // Stato per sidebar mobile (drawer temporary)
  const [mobileOpen, setMobileOpen] = useState(false);

  // Stato tema (dark mode) - per ora placeholder
  const [darkMode, setDarkMode] = useState(false);

  // Mock sessioni - verrà sostituito con Redux nella Fase 5
  const mockSessions = [
    { id: "1", title: "Conversazione su React", active: true },
    { id: "2", title: "Domande su Material UI", active: false },
    { id: "3", title: "Redux Toolkit tutorial", active: false },
  ];

  /**
   * Toggle sidebar mobile
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Toggle tema light/dark
   */
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    console.log("🎨 Tema cambiato:", !darkMode ? "Dark" : "Light");
    // TODO Fase 8: implementare theming reale con MUI ThemeProvider
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header fisso in alto */}
      <Header
        onMenuClick={handleDrawerToggle}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />

      {/* Sidebar laterale (responsive) */}
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sessions={mockSessions}
      />

      {/* Area contenuto principale */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {/* Toolbar spacer: crea spazio per l'header sticky */}
        <Toolbar />

        {/* Contenuto dinamico (pagine) */}
        {children}
      </Box>
    </Box>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
