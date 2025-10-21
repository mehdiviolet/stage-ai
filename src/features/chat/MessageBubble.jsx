// src/features/chat/components/MessageBubble.jsx
import { Box, Paper, Avatar } from "@mui/material";
import { Person, SmartToy } from "@mui/icons-material";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        gap: 1,
        alignItems: "flex-start",
      }}
    >
      {/* Avatar - solo per assistant a sinistra */}
      {!isUser && (
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 32,
            height: 32,
          }}
        >
          <SmartToy fontSize="small" />
        </Avatar>
      )}

      {/* Bubble del messaggio */}
      <Paper
        elevation={1}
        sx={{
          px: 2,
          py: 1.5,
          maxWidth: "70%",
          bgcolor: isUser ? "primary.main" : "background.paper",
          color: isUser ? "primary.contrastText" : "text.primary",
          borderRadius: 2,
          borderTopRightRadius: isUser ? 0 : 2,
          borderTopLeftRadius: isUser ? 2 : 0,
        }}
      >
        <Box sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {message.content}
        </Box>

        {/* Timestamp */}
        <Box
          sx={{
            fontSize: "0.75rem",
            opacity: 0.7,
            mt: 0.5,
            textAlign: isUser ? "right" : "left",
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Box>
      </Paper>

      {/* Avatar - solo per user a destra */}
      {isUser && (
        <Avatar
          sx={{
            bgcolor: "secondary.main",
            width: 32,
            height: 32,
          }}
        >
          <Person fontSize="small" />
        </Avatar>
      )}
    </Box>
  );
}
