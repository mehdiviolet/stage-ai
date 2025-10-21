// src/features/chat/components/ChatInput.jsx
import { useState } from "react";
import { Box, TextField, IconButton, Alert } from "@mui/material";
import { Send } from "@mui/icons-material";

export default function ChatInput({ onSendMessage, disabled, error }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue(""); // Reset input dopo invio
    }
  };

  const handleKeyPress = (e) => {
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
        sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Scrivi un messaggio a MadGem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
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
          disabled={disabled || !inputValue.trim()}
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
