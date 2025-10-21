// src/features/chat/ChatPage.jsx
import { useState } from "react";
import { Box, Container, Paper } from "@mui/material";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatPage() {
  // Stato locale per i messaggi
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Ciao! Sono MadGem, il tuo assistente AI. Come posso aiutarti oggi?",
      timestamp: new Date().toISOString(),
    },
  ]);

  // Stato per il loading
  const [isLoading, setIsLoading] = useState(false);

  // Stato per gli errori
  const [error, setError] = useState(null);

  // Handler per l'invio del messaggio
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // 1. Aggiungi il messaggio dell'utente
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setError(null);

    // 2. Mostra loading
    setIsLoading(true);

    try {
      // 3. Chiamata API (per ora simulata con timeout)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 4. Simula risposta dell'AI
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Hai scritto: "${messageText}". Questa è una risposta simulata. Presto sarò connesso a MadGem!`,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError("Si è verificato un errore. Riprova.");
      console.error("Errore invio messaggio:", err);
    } finally {
      // 5. Nascondi loading
      setIsLoading(false);
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
        {/* Area messaggi */}
        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          <MessageList messages={messages} isLoading={isLoading} />
        </Box>

        {/* Input messaggio */}
        <Box sx={{ borderTop: 1, borderColor: "divider", p: 2 }}>
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
            error={error}
          />
        </Box>
      </Paper>
    </Container>
  );
}
