// src/features/chat/ChatPage.jsx
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
  sendMessageThunk,
  clearMessages,
  selectMessages,
  selectIsLoading,
  selectError,
} from "./chatSlice";

export default function ChatPage() {
  const dispatch = useDispatch();

  // Leggi lo stato da Redux
  const messages = useSelector(selectMessages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Handler per l'invio del messaggio
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    dispatch(sendMessageThunk(messageText));
  };

  // Handler per cancellare la conversazione
  const handleClearChat = () => {
    if (window.confirm("Vuoi davvero cancellare tutta la conversazione?")) {
      dispatch(clearMessages());
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
              {" "}
              {/* span wrapper per tooltip su IconButton disabilitato */}
              <IconButton
                onClick={handleClearChat}
                disabled={messages.length <= 1}
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
