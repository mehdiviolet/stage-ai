// src/pages/SettingsPage.jsx
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
  Button,
  Alert,
  Stack,
} from "@mui/material";
import {
  Brightness4,
  Language,
  SmartToy,
  Animation,
  VolumeUp,
  History,
  RestartAlt,
  FileDownload,
  FileUpload,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setTheme,
  setLanguage,
  setModel,
  toggleAnimations,
  toggleSoundEffects,
  toggleSaveHistory,
  resetSettings,
  selectAllSettings,
} from "../features/settings/settingsSlice";
import { clearAllSessions } from "../features/sessions/sessionSlice";
import { exportSessionsData, importSessionsData } from "../lib/storage/session";

export function SettingsPage() {
  const dispatch = useDispatch();
  const settings = useSelector(selectAllSettings);

  // Handler export dati
  const handleExportData = () => {
    const data = exportSessionsData();
    if (!data) return;

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `madgem_backup_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Handler import dati
  const handleImportData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          const success = importSessionsData(data);

          if (success) {
            alert("Dati importati con successo! Ricarica la pagina.");
            window.location.reload();
          } else {
            alert("Errore nell'importazione dei dati.");
          }
        } catch (error) {
          alert("File non valido.");
          console.error(error);
        }
      };
      reader.readAsText(file);
    };

    input.click();
  };

  // Handler reset completo
  const handleResetAll = () => {
    if (
      window.confirm(
        "Sei sicuro? Questo eliminerà TUTTE le conversazioni e resetterà le impostazioni."
      )
    ) {
      dispatch(clearAllSessions());
      dispatch(resetSettings());
      alert("Reset completato!");
      window.location.reload();
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
          ⚙️ Impostazioni
        </Typography>

        <Typography variant="body1" paragraph color="text.secondary">
          Personalizza l'esperienza con MadGem.
        </Typography>
      </Paper>

      {/* Aspetto */}
      <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Brightness4 color="primary" />
          <Typography variant="h6">Aspetto</Typography>
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tema</InputLabel>
          <Select
            value={settings.theme}
            label="Tema"
            onChange={(e) => dispatch(setTheme(e.target.value))}
          >
            <MenuItem value="light">Chiaro</MenuItem>
            <MenuItem value="dark">Scuro</MenuItem>
            <MenuItem value="auto">Automatico (sistema)</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={settings.animations}
              onChange={() => dispatch(toggleAnimations())}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Animation fontSize="small" />
              Animazioni
            </Box>
          }
        />
      </Paper>

      {/* Lingua */}
      <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Language color="primary" />
          <Typography variant="h6">Lingua</Typography>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Lingua interfaccia</InputLabel>
          <Select
            value={settings.language}
            label="Lingua interfaccia"
            onChange={(e) => dispatch(setLanguage(e.target.value))}
          >
            <MenuItem value="it">🇮🇹 Italiano</MenuItem>
            <MenuItem value="en">🇬🇧 English</MenuItem>
            <MenuItem value="es">🇪🇸 Español</MenuItem>
          </Select>
        </FormControl>

        <Alert severity="info" sx={{ mt: 2 }}>
          La traduzione completa sarà disponibile in futuro.
        </Alert>
      </Paper>

      {/* Modello AI */}
      <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <SmartToy color="primary" />
          <Typography variant="h6">Modello AI</Typography>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Modello MadGem</InputLabel>
          <Select
            value={settings.model}
            label="Modello MadGem"
            onChange={(e) => dispatch(setModel(e.target.value))}
          >
            <MenuItem value="madgem">MadGem Standard</MenuItem>
            <MenuItem value="madgem-fast">MadGem Fast (veloce)</MenuItem>
            <MenuItem value="madgem-creative">MadGem Creative</MenuItem>
          </Select>
        </FormControl>

        <Alert severity="info" sx={{ mt: 2 }}>
          Attualmente in modalità MOCK. La selezione del modello sarà attiva
          quando connesso all'API reale.
        </Alert>
      </Paper>

      {/* Privacy & Dati */}
      <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <History color="primary" />
          <Typography variant="h6">Privacy & Dati</Typography>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={settings.saveHistory}
              onChange={() => dispatch(toggleSaveHistory())}
            />
          }
          label="Salva storico conversazioni"
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.soundEffects}
              onChange={() => dispatch(toggleSoundEffects())}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VolumeUp fontSize="small" />
              Effetti sonori
            </Box>
          }
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Gestione Dati
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FileDownload />}
            onClick={handleExportData}
          >
            Esporta Dati
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileUpload />}
            onClick={handleImportData}
          >
            Importa Dati
          </Button>
        </Stack>
      </Paper>

      {/* Zona Pericolosa */}
      <Paper elevation={1} sx={{ p: 3, bgcolor: "error.light" }}>
        <Typography variant="h6" gutterBottom color="error.dark">
          ⚠️ Zona Pericolosa
        </Typography>

        <Typography variant="body2" paragraph>
          Queste azioni sono irreversibili. Procedere con cautela.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<RestartAlt />}
            onClick={() => {
              if (window.confirm("Reset delle sole impostazioni?")) {
                dispatch(resetSettings());
              }
            }}
          >
            Reset Impostazioni
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<RestartAlt />}
            onClick={handleResetAll}
          >
            Reset Completo
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
