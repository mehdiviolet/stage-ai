// src/components/sessions/RenameSessionModal.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  renameSession,
  selectSessionById,
} from "../../features/sessions/sessionSlice";

export default function RenameSessionModal({ open, sessionId, onClose }) {
  const dispatch = useDispatch();
  const session = useSelector(selectSessionById(sessionId));
  const [newTitle, setNewTitle] = useState("");

  // Quando si apre il modal, carica il titolo corrente
  useEffect(() => {
    if (open && session) {
      setNewTitle(session.title);
    }
  }, [open, session]);

  // Handler salvataggio
  const handleSave = () => {
    if (newTitle.trim() && sessionId) {
      dispatch(
        renameSession({
          sessionId,
          newTitle: newTitle.trim(),
        })
      );
      onClose();
    }
  };

  // Handler Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Rinomina Conversazione</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Nuovo titolo"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          margin="normal"
          variant="outlined"
          helperText="Premi Invio per salvare"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annulla</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!newTitle.trim()}
        >
          Salva
        </Button>
      </DialogActions>
    </Dialog>
  );
}
