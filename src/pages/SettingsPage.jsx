import {
  Container,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  Switch,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export function SettingsPage() {
  return (
    <Container maxWidth="md">
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
          ⚙️ Impostazioni
        </Typography>

        <Typography variant="body1" paragraph>
          Configura le tue preferenze dell'applicazione.
        </Typography>

        <Box sx={{ bgcolor: "info.light", p: 2, borderRadius: 1, mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            📋 Da implementare nella Fase 6:
          </Typography>
          <ul style={{ margin: 0 }}>
            <li>Toggle tema light/dark (funzionante)</li>
            <li>Selezione lingua</li>
            <li>Preferenze modello AI</li>
            <li>Salvataggio in localStorage</li>
            <li>Reset impostazioni</li>
          </ul>
        </Box>
      </Paper>

      {/* Preview settings */}
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Preview Impostazioni (placeholder):
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Aspetto
          </Typography>
          <FormControlLabel control={<Switch disabled />} label="Tema scuro" />
          <FormControlLabel
            control={<Switch disabled defaultChecked />}
            label="Animazioni"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Lingua
          </Typography>
          <FormControl fullWidth disabled sx={{ mt: 1 }}>
            <InputLabel>Lingua</InputLabel>
            <Select value="it" label="Lingua">
              <MenuItem value="it">Italiano</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Modello AI
          </Typography>
          <FormControl fullWidth disabled sx={{ mt: 1 }}>
            <InputLabel>Modello</InputLabel>
            <Select value="madgem" label="Modello">
              <MenuItem value="madgem">MadGem Default</MenuItem>
              <MenuItem value="madgem-fast">MadGem Fast</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
}
