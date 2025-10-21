// src/features/chat/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendChatMessage } from "./api";

/**
 * Stato iniziale della chat
 */
const initialState = {
  // Array di messaggi della conversazione corrente
  messages: [
    {
      id: "1",
      role: "assistant",
      content:
        "Ciao! Sono MadGem, il tuo assistente AI. Come posso aiutarti oggi?",
      timestamp: new Date().toISOString(),
    },
  ],

  // Stati di caricamento
  isLoading: false,

  // Gestione errori
  error: null,

  // Metadata (futuro)
  currentSessionId: null,
  lastMessageTimestamp: null,
};

/**
 * Thunk Asincrono - Invia messaggio all'API
 *
 * Gestisce automaticamente pending/fulfilled/rejected
 */
export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async (messageText, { rejectWithValue }) => {
    try {
      // Chiamata API (mock o reale)
      const response = await sendChatMessage(messageText);

      return {
        userMessage: messageText,
        aiResponse: response.data.message,
        timestamp: response.data.timestamp || new Date().toISOString(),
      };
    } catch (error) {
      // Passa l'errore al rejected case
      return rejectWithValue(
        error.message || "Errore durante l'invio del messaggio"
      );
    }
  }
);

/**
 * Chat Slice - Gestisce lo stato della chat
 */
const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    /**
     * Aggiunge un messaggio manualmente (opzionale)
     */
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    /**
     * Resetta la conversazione
     */
    clearMessages: (state) => {
      state.messages = [initialState.messages[0]]; // Mantieni messaggio di benvenuto
      state.error = null;
    },

    /**
     * Pulisce gli errori
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Imposta session ID (futuro)
     */
    setSessionId: (state, action) => {
      state.currentSessionId = action.payload;
    },
  },

  /**
   * Extra Reducers - Gestiscono gli stati dei thunks
   */
  extraReducers: (builder) => {
    builder
      // PENDING - Quando inizia la chiamata API
      .addCase(sendMessageThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;

        // Aggiungi subito il messaggio dell'utente
        const userMessage = {
          id: crypto.randomUUID(),
          role: "user",
          content: action.meta.arg, // Il messageText passato al thunk
          timestamp: new Date().toISOString(),
        };
        state.messages.push(userMessage);
      })

      // FULFILLED - Quando la chiamata ha successo
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        // Aggiungi la risposta dell'AI
        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: action.payload.aiResponse,
          timestamp: action.payload.timestamp,
        };
        state.messages.push(assistantMessage);
        state.lastMessageTimestamp = action.payload.timestamp;
      })

      // REJECTED - Quando la chiamata fallisce
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Errore sconosciuto";
      });
  },
});

/**
 * Esporta le actions
 */
export const { addMessage, clearMessages, clearError, setSessionId } =
  chatSlice.actions;

/**
 * Selectors - Per leggere lo stato in modo ottimizzato
 */
export const selectMessages = (state) => state.chat.messages;
export const selectIsLoading = (state) => state.chat.isLoading;
export const selectError = (state) => state.chat.error;
export const selectCurrentSessionId = (state) => state.chat.currentSessionId;

/**
 * Esporta il reducer
 */
export default chatSlice.reducer;
