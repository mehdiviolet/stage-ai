// src/features/chat/ChatPage.jsx
import { useEffect, useState } from "react"; // ← AGGIUNGI useState
import {
  Box,
  Container,
  Paper,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import {
  loadSessionMessages,
  clearMessages,
  selectMessages,
  selectIsLoading,
  selectError,
  addMessage,
} from "./chatSlice";
import {
  selectCurrentSession,
  updateSessionMessages,
  clearSessionMessages, // ← AGGIUNGI questo import
} from "../sessions/sessionSlice";
import apiClient from "../../lib/api/client";

export default function ChatPage() {
  const dispatch = useDispatch();

  // ✅ AGGIUNGI stato locale per input e loading
  const [inputMessage, setInputMessage] = useState("");
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  // Leggi lo stato da Redux
  const messages = useSelector(selectMessages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentSession = useSelector(selectCurrentSession);

  // Quando cambia la sessione corrente, carica i suoi messaggi
  useEffect(() => {
    if (currentSession) {
      dispatch(loadSessionMessages(currentSession.messages));
    }
  }, [currentSession?.id, dispatch]);

  // Quando cambiano i messaggi, aggiorna la sessione
  useEffect(() => {
    if (currentSession && messages.length > 0) {
      dispatch(
        updateSessionMessages({
          sessionId: currentSession.id,
          messages: messages,
        })
      );
    }
  }, [messages, currentSession?.id, dispatch]);

  // ✅ Handler per l'invio del messaggio
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentSession) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    // Aggiungi subito il messaggio dell'utente
    dispatch(addMessage(userMessage));

    setInputMessage("");
    setIsLoadingAPI(true);

    try {
      // ✅ CHIAMATA API REALE
      const response = await apiClient.post("/chat/ask", {
        message: userMessage.text,
        sessionId: currentSession.id,
        history: messages, // Invia lo storico per contesto
      });

      // Messaggio di risposta dall'AI
      const aiMessage = {
        id: Date.now() + 1,
        text:
          response.data.reply ||
          response.data.message ||
          "Nessuna risposta dall'AI",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      dispatch(addMessage(aiMessage));
    } catch (error) {
      console.error("❌ Errore API:", error);

      // Messaggio di errore mostrato nella chat
      const errorMessage = {
        id: Date.now() + 1,
        text: `⚠️ Errore: ${
          error.response?.data?.message ||
          error.message ||
          "Impossibile contattare il server"
        }`,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      dispatch(addMessage(errorMessage));
    } finally {
      setIsLoadingAPI(false);
    }
  };

  // ✅ Handler per cancellare la conversazione
  const handleClearChat = () => {
    if (window.confirm("Vuoi davvero cancellare tutta la conversazione?")) {
      if (currentSession) {
        // Pulisci i messaggi della sessione corrente
        dispatch(clearSessionMessages(currentSession.id));
        dispatch(loadSessionMessages([]));
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: "calc(100vh - 120px)", py: 3 }}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* HEADER con titolo e bottone cancella */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
            borderBottom: 2,
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            💬 <span>Chat con MadGem</span>
          </Typography>

          <Tooltip title="Cancella tutta la conversazione">
            <span>
              <IconButton
                onClick={handleClearChat}
                disabled={messages.length === 0}
                color="error"
                sx={{
                  "&:hover": {
                    bgcolor: "error.light",
                    color: "error.dark",
                  },
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        {/* Area messaggi */}
        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          <MessageList messages={messages} isLoading={isLoadingAPI} />
        </Box>

        {/* Input messaggio */}
        <Box sx={{ borderTop: 1, borderColor: "divider", p: 2 }}>
          <ChatInput
            value={inputMessage}
            onChange={setInputMessage}
            onSendMessage={handleSendMessage}
            disabled={isLoadingAPI}
            error={error}
          />
        </Box>
      </Paper>
    </Container>
  );
}
