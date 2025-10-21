// src/features/chat/components/MessageList.jsx
import { Box, CircularProgress } from "@mui/material";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, isLoading }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pl: 2,
          }}
        >
          <CircularProgress size={20} />
          <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            MadGem sta pensando...
          </Box>
        </Box>
      )}
    </Box>
  );
}
