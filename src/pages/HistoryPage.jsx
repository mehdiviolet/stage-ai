// src/pages/HistoryPage.jsx
import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import {
  Search,
  MoreVert,
  ChatBubbleOutline,
  Delete,
  FileDownload,
  OpenInNew,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectSortedSessions,
  deleteSession,
  switchSession,
} from "../features/sessions/sessionSlice";

export function HistoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessions = useSelector(selectSortedSessions);

  const [searchQuery, setSearchQuery] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Filtra sessioni in base alla ricerca
  const filteredSessions = sessions.filter((session) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = session.title.toLowerCase().includes(query);

    // Cerca anche nei messaggi
    const messagesMatch = session.messages.some((msg) =>
      msg.content.toLowerCase().includes(query)
    );

    return titleMatch || messagesMatch;
  });

  // Formatta data completa
  const formatFullDate = (dateString) => {
    return new Date(dateString).toLocaleString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Conta messaggi utente
  const countUserMessages = (messages) => {
    return messages.filter((msg) => msg.role === "user").length;
  };

  // Preview primo messaggio utente
  const getFirstUserMessage = (messages) => {
    const firstMsg = messages.find((msg) => msg.role === "user");
    if (!firstMsg) return "Nessun messaggio";

    return firstMsg.content.length > 100
      ? firstMsg.content.slice(0, 100) + "..."
      : firstMsg.content;
  };

  // Handler menu
  const handleMenuOpen = (event, sessionId) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedSessionId(sessionId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedSessionId(null);
  };

  // Handler apri conversazione
  const handleOpenSession = (sessionId) => {
    dispatch(switchSession(sessionId));
    navigate("/");
  };

  // Handler elimina
  const handleDelete = () => {
    if (window.confirm("Sei sicuro di voler eliminare questa conversazione?")) {
      dispatch(deleteSession(selectedSessionId));
    }
    handleMenuClose();
  };

  // Handler esporta
  const handleExport = () => {
    const session = sessions.find((s) => s.id === selectedSessionId);
    if (!session) return;

    const dataStr = JSON.stringify(session, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `chat_${session.title}_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    handleMenuClose();
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
          📜 Storico Conversazioni
        </Typography>

        <Typography variant="body1" paragraph color="text.secondary">
          Qui trovi tutte le tue conversazioni salvate con MadGem.
        </Typography>

        {/* Barra ricerca */}
        <TextField
          fullWidth
          placeholder="Cerca per titolo o contenuto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2 }}
        />

        {/* Stats */}
        <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Chip
            icon={<ChatBubbleOutline />}
            label={`${sessions.length} conversazioni totali`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${filteredSessions.length} risultati`}
            color="secondary"
            variant="outlined"
          />
        </Box>
      </Paper>

      {/* Lista conversazioni */}
      {filteredSessions.length === 0 ? (
        <Alert severity="info">
          {searchQuery
            ? "Nessuna conversazione trovata per questa ricerca."
            : "Non hai ancora nessuna conversazione salvata."}
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {filteredSessions.map((session) => (
            <Grid item xs={12} md={6} key={session.id}>
              <Card
                elevation={1}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      noWrap
                      sx={{ flexGrow: 1 }}
                    >
                      {session.title}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, session.id)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    {formatFullDate(session.updatedAt)}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    {getFirstUserMessage(session.messages)}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Chip
                      size="small"
                      label={`${countUserMessages(session.messages)} messaggi`}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    startIcon={<OpenInNew />}
                    onClick={() => handleOpenSession(session.id)}
                  >
                    Apri
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Menu contestuale */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOpenSession(selectedSessionId)}>
          <OpenInNew fontSize="small" sx={{ mr: 1 }} />
          Apri conversazione
        </MenuItem>
        <MenuItem onClick={handleExport}>
          <FileDownload fontSize="small" sx={{ mr: 1 }} />
          Esporta JSON
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete fontSize="small" sx={{ mr: 1 }} color="error" />
          Elimina
        </MenuItem>
      </Menu>
    </Container>
  );
}
