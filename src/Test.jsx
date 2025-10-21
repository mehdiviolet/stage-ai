import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Box, Container, Typography } from "@mui/material";

/**
 * Componente temporaneo per testare l'Header
 * Usa questo in main.jsx al posto di AppRouter per testare
 */
function AppTest() {
  const [darkMode, setDarkMode] = useState(false);

  const handleMenuClick = () => {
    console.log("✅ Menu clicked! (Sidebar verrà implementata nel Task 2.4)");
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    console.log("🎨 Theme toggled:", !darkMode ? "Dark" : "Light");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header Component */}
      <Header
        onMenuClick={handleMenuClick}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />

      {/* Contenuto di test */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          🧪 Test Header Component
        </Typography>

        <Typography variant="body1" paragraph>
          Questo è un contenuto di test per verificare che l'Header funzioni
          correttamente.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          ✅ Checklist Test:
        </Typography>

        <ul>
          <li>Header visibile in alto?</li>
          <li>
            Icona menu visibile su mobile? (ridimensiona finestra &lt; 900px)
          </li>
          <li>Click su menu mostra log in console?</li>
          <li>Click su icona tema cambia icona?</li>
          <li>Header rimane fisso quando scrolla?</li>
          <li>Titolo "AI Platform" visibile?</li>
        </ul>

        {/* Contenuto lungo per testare lo scroll */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            📜 Scroll Test
          </Typography>
          <Typography paragraph>
            Scrolla verso il basso per verificare che l'Header rimanga fisso
            (sticky).
          </Typography>

          {/* Genera molto contenuto */}
          {[...Array(30)].map((_, i) => (
            <Typography key={i} paragraph>
              Paragrafo {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default AppTest;
