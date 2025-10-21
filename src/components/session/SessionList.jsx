// src/components/sessions/SessionList.jsx
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { ChatBubbleOutline, MoreVert, Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  switchSession,
  deleteSession,
  selectSortedSessions,
  selectCurrentSessionId,
} from "../../features/sessions/sessionSlice";
import RenameSessionModal from "./RenameSessionModal";

export default function SessionList({ onSessionClick }) {
  const dispatch = useDispatch();
  const sessions = useSelector(selectSortedSessions);
  const currentSessionId = useSelector(selectCurrentSessionId);

  // Stati per menu contestuale
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Stati per modal rinomina
  const [renameModalOpen, setRenameModalOpen] = useState(false);

  // Handler click su sessione
  const handleSessionClick = (sessionId) => {
    dispatch(switchSession(sessionId));
    if (onSessionClick) {
      onSessionClick(); // Chiude sidebar su mobile
    }
  };

  // Handler apertura menu contestuale
  const handleMenuOpen = (event, sessionId) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedSessionId(sessionId);
  };

  // Handler chiusura menu
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedSessionId(null);
  };

  // Handler rinomina
  const handleRename = () => {
    setRenameModalOpen(true);
    handleMenuClose();
  };

  // Handler elimina
  const handleDelete = () => {
    if (window.confirm("Sei sicuro di voler eliminare questa conversazione?")) {
      dispatch(deleteSession(selectedSessionId));
    }
    handleMenuClose();
  };

  // Formatta data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Oggi";
    if (diffDays === 1) return "Ieri";
    if (diffDays < 7) return `${diffDays} giorni fa`;

    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
    });
  };

  if (sessions.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Nessuna sessione
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Clicca "Nuova Chat" per iniziare
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List dense>
        {sessions.map((session) => (
          <ListItem
            key={session.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                size="small"
                onClick={(e) => handleMenuOpen(e, session.id)}
              >
                <MoreVert fontSize="small" />
              </IconButton>
            }
          >
            <ListItemButton
              selected={session.id === currentSessionId}
              onClick={() => handleSessionClick(session.id)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ChatBubbleOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={session.title}
                secondary={formatDate(session.updatedAt)}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  noWrap: true,
                  fontWeight: session.id === currentSessionId ? 600 : 400,
                }}
                secondaryTypographyProps={{
                  fontSize: "0.75rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Menu contestuale */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRename}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rinomina</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Elimina</ListItemText>
        </MenuItem>
      </Menu>

      {/* Modal rinomina */}
      <RenameSessionModal
        open={renameModalOpen}
        sessionId={selectedSessionId}
        onClose={() => setRenameModalOpen(false)}
      />
    </>
  );
}
