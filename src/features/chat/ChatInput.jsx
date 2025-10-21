// src/features/chat/ChatInput.jsx
// VERSIONE CONTROLLATA - Il parent (ChatPage) controlla il valore
import { Box, TextField, IconButton, Alert } from "@mui/material";
import { Send } from "@mui/icons-material";

export default function ChatInput({
  value, // ✅ Riceve il valore dal parent
  onChange, // ✅ Riceve l'handler dal parent
  onSendMessage,
  disabled,
  error,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() && !disabled) {
      onSendMessage(); // ✅ Non passa più il valore (ChatPage lo ha già)
    }
  };

  const handleKeyDown = (e) => {
    // Invio con Enter (senza Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box>
      {/* Messaggio di errore */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Form di input */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          minRows={1}
          placeholder="Scrivi un messaggio a MadGem..."
          value={value} // ✅ Usa il valore dal parent
          onChange={(e) => onChange(e.target.value)} // ✅ Notifica il parent
          onKeyDown={handleKeyDown}
          disabled={disabled}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <IconButton
          type="submit"
          color="primary"
          disabled={disabled || !value.trim()} // ✅ Usa value invece di inputValue
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&:disabled": {
              bgcolor: "action.disabledBackground",
            },
          }}
        >
          <Send />
        </IconButton>
      </Box>

      {/* Hint */}
      <Box
        sx={{
          fontSize: "0.75rem",
          color: "text.secondary",
          mt: 1,
          textAlign: "center",
        }}
      >
        Premi Invio per inviare, Shift+Invio per andare a capo
      </Box>
    </Box>
  );
}
