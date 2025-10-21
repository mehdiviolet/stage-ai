import { Container, Typography, Paper, Box } from "@mui/material";

export function ChatPage() {
  return (
    <Container maxWidth="lg">
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
          💬 Chat AI
        </Typography>

        <Typography variant="body1" paragraph>
          Questa sarà la pagina principale per chattare con MadGem.
        </Typography>

        <Box sx={{ bgcolor: "info.light", p: 2, borderRadius: 1, mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            📋 Da implementare nella Fase 3:
          </Typography>
          <ul style={{ margin: 0 }}>
            <li>Area messaggi (lista conversazione)</li>
            <li>Input per scrivere messaggi</li>
            <li>Bottone "Invia"</li>
            <li>Loading spinner durante risposta</li>
            <li>Gestione errori</li>
          </ul>
        </Box>
      </Paper>

      {/* Preview layout futuro */}
      <Paper elevation={1} sx={{ p: 3, bgcolor: "grey.100" }}>
        <Typography variant="caption" color="text.secondary">
          Preview Layout Futuro:
        </Typography>
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "white",
            borderRadius: 1,
            minHeight: 400,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 10 }}
          >
            Area Conversazione
            <br />
            (verrà implementata nella Fase 3)
          </Typography>
        </Box>
        <Box sx={{ mt: 2, p: 2, bgcolor: "white", borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Input Messaggio + Bottone Invia
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
