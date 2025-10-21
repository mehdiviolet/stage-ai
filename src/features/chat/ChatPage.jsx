// src/features/chat/ChatPage.jsx
import { useEffect, useState } from "react";
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
  selectMessages,
  selectError,
  addMessage,
} from "./chatSlice";
import {
  selectCurrentSession,
  updateSessionMessages,
  clearSessionMessages,
} from "../sessions/sessionSlice";
import apiClient from "../../lib/api/client";

export default function ChatPage() {
  const dispatch = useDispatch();

  const [inputMessage, setInputMessage] = useState("");
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  const messages = useSelector(selectMessages);
  const error = useSelector(selectError);
  const currentSession = useSelector(selectCurrentSession);

  // Carica messaggi quando cambia sessione
  useEffect(() => {
    if (currentSession) {
      dispatch(loadSessionMessages(currentSession.messages));
    }
  }, [currentSession?.id, dispatch]);

  // Salva messaggi quando cambiano
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

  // ✅ HANDLER INVIO MESSAGGIO - STRUTTURA CORRETTA
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentSession) return;

    // ✅ Usa la struttura corretta: role + content
    const userMessage = {
      id: Date.now().toString(),
      role: "user", // ✅ "role" non "sender"
      content: inputMessage.trim(), // ✅ "content" non "text"
      timestamp: new Date().toISOString(),
    };

    // Aggiungi il messaggio utente
    dispatch(addMessage(userMessage));

    // Resetta input
    setInputMessage("");
    setIsLoadingAPI(true);

    try {
      // Chiamata API
      const response = await apiClient.post("/chat/ask", {
        message: userMessage.content,
        sessionId: currentSession.id,
        history: messages,
      });

      // ✅ Risposta AI con struttura corretta
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant", // ✅ "role"
        content:
          response.data.reply || response.data.message || "Nessuna risposta", // ✅ "content"
        timestamp: new Date().toISOString(),
      };

      dispatch(addMessage(aiMessage));
    } catch (error) {
      console.error("❌ Errore API:", error);

      // ✅ Messaggio di errore con struttura corretta
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚠️ Errore: ${
          error.response?.data?.message ||
          error.message ||
          "Impossibile contattare il server"
        }`,
        timestamp: new Date().toISOString(),
      };

      dispatch(addMessage(errorMessage));
    } finally {
      setIsLoadingAPI(false);
    }
  };

  // Handler cancellazione chat
  const handleClearChat = () => {
    if (window.confirm("Vuoi davvero cancellare tutta la conversazione?")) {
      if (currentSession) {
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
        {/* HEADER */}
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

          <Tooltip title="Cancella conversazione">
            <span>
              <IconButton
                onClick={handleClearChat}
                disabled={messages.length === 0}
                color="error"
              >
                <DeleteOutlineIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        {/* MESSAGGI */}
        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          <MessageList messages={messages} isLoading={isLoadingAPI} />
        </Box>

        {/* INPUT */}
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
