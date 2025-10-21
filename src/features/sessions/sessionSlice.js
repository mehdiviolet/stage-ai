// src/features/sessions/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createEmptySession,
  generateSessionTitle,
  sortSessionsByDate,
  updateSessionTimestamp,
} from "./sessionUtils";

/**
 * Stato iniziale per le sessioni
 */
const initialState = {
  // Array di tutte le sessioni
  items: [createEmptySession()],

  // ID della sessione correntemente attiva
  currentSessionId: null,

  // Stati UI
  isLoading: false,
  error: null,
};

// Imposta la prima sessione come corrente
initialState.currentSessionId = initialState.items[0].id;

/**
 * Session Slice - Gestisce tutte le sessioni di chat
 */
const sessionSlice = createSlice({
  name: "sessions",
  initialState,

  reducers: {
    /**
     * Crea una nuova sessione
     */
    createSession: (state) => {
      const newSession = createEmptySession();
      state.items.push(newSession);
      state.currentSessionId = newSession.id;
    },

    /**
     * Switch alla sessione selezionata
     */
    switchSession: (state, action) => {
      const sessionId = action.payload;
      const sessionExists = state.items.find((s) => s.id === sessionId);

      if (sessionExists) {
        state.currentSessionId = sessionId;
      }
    },

    /**
     * Rinomina una sessione
     */
    renameSession: (state, action) => {
      const { sessionId, newTitle } = action.payload;
      const session = state.items.find((s) => s.id === sessionId);

      if (session) {
        session.title = newTitle;
        session.updatedAt = new Date().toISOString();
      }
    },

    /**
     * Elimina una sessione
     */
    deleteSession: (state, action) => {
      const sessionId = action.payload;
      const index = state.items.findIndex((s) => s.id === sessionId);

      if (index === -1) return;

      // Rimuovi la sessione
      state.items.splice(index, 1);

      // Se abbiamo eliminato la sessione corrente, switch a un'altra
      if (state.currentSessionId === sessionId) {
        if (state.items.length > 0) {
          // Prendi la sessione più recente
          const sortedSessions = sortSessionsByDate(state.items);
          state.currentSessionId = sortedSessions[0].id;
        } else {
          // Nessuna sessione rimasta, creane una nuova
          const newSession = createEmptySession();
          state.items.push(newSession);
          state.currentSessionId = newSession.id;
        }
      }
    },

    /**
     * Aggiorna i messaggi di una sessione
     * Chiamato quando si invia/riceve un messaggio
     */
    updateSessionMessages: (state, action) => {
      const { sessionId, messages } = action.payload;
      const session = state.items.find((s) => s.id === sessionId);

      if (session) {
        session.messages = messages;
        session.updatedAt = new Date().toISOString();

        // Aggiorna il titolo automaticamente se è ancora "Nuova conversazione"
        if (session.title === "Nuova conversazione" && messages.length > 1) {
          session.title = generateSessionTitle(messages);
        }
      }
    },

    clearSessionMessages: (state, action) => {
      const sessionId = action.payload;
      const session = state.items.find((s) => s.id === sessionId);

      if (session) {
        session.messages = [];
        session.updatedAt = new Date().toISOString();
        session.title = "Nuova conversazione"; // Reset anche il titolo
      }
    },
    /**
     * Carica sessioni da localStorage (usato all'avvio)
     */
    loadSessions: (state, action) => {
      const { sessions, currentSessionId } = action.payload;

      if (sessions && sessions.length > 0) {
        state.items = sessions;
        state.currentSessionId = currentSessionId || sessions[0].id;
      }
    },

    /**
     * Pulisce tutte le sessioni (reset completo)
     */
    clearAllSessions: (state) => {
      const newSession = createEmptySession();
      state.items = [newSession];
      state.currentSessionId = newSession.id;
      state.error = null;
    },
  },
});

/**
 * Export actions
 */
export const {
  createSession,
  switchSession,
  renameSession,
  deleteSession,
  updateSessionMessages,
  loadSessions,
  clearAllSessions,
  clearSessionMessages,
} = sessionSlice.actions;

/**
 * Selectors
 */
export const selectAllSessions = (state) => state.sessions.items;
export const selectCurrentSessionId = (state) =>
  state.sessions.currentSessionId;
export const selectCurrentSession = (state) => {
  const currentId = state.sessions.currentSessionId;
  return state.sessions.items.find((s) => s.id === currentId);
};
export const selectSessionById = (sessionId) => (state) => {
  return state.sessions.items.find((s) => s.id === sessionId);
};
export const selectSortedSessions = (state) => {
  return sortSessionsByDate(state.sessions.items);
};

export const loadSessionsFromStorage = () => (dispatch) => {
  try {
    const savedData = localStorage.getItem("sessions");

    if (savedData) {
      const parsed = JSON.parse(savedData);

      // Verifica che i dati abbiano la struttura corretta
      if (parsed && parsed.items && Array.isArray(parsed.items)) {
        // Carica tutte le sessioni in un colpo solo
        dispatch(
          loadSessions({
            sessions: parsed.items,
            currentSessionId: parsed.currentSessionId,
          })
        );

        console.log(
          "✅ Sessioni caricate da localStorage:",
          parsed.items.length
        );
      }
    }
  } catch (error) {
    console.error("❌ Errore nel caricamento sessioni:", error);
  }
};

/**
 * Salva le sessioni in localStorage
 */
export const saveSessionsToStorage = (sessionsState) => {
  try {
    localStorage.setItem("sessions", JSON.stringify(sessionsState));
  } catch (error) {
    console.error("❌ Errore nel salvataggio sessioni:", error);
  }
};

/**
 * Export reducer
 */
export default sessionSlice.reducer;
