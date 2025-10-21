// src/app/middleware/persistMiddleware.js
// import { saveSessions, saveCurrentSessionId } from "../../lib/storage/sessions";
import { saveSessions, saveCurrentSessionId } from "../../lib/storage/session";

/**
 * Middleware Redux per salvare automaticamente le sessioni
 * Ogni volta che lo stato cambia, salva in localStorage
 */
export const persistMiddleware = (store) => (next) => (action) => {
  // Esegui l'action normalmente
  const result = next(action);

  // Dopo ogni action che modifica le sessioni, salva in localStorage
  const actionsToSave = [
    "sessions/createSession",
    "sessions/switchSession",
    "sessions/renameSession",
    "sessions/deleteSession",
    "sessions/updateSessionMessages",
    "sessions/clearAllSessions",
  ];

  if (actionsToSave.includes(action.type)) {
    const state = store.getState();

    // Salva le sessioni
    saveSessions(state.sessions.items);

    // Salva l'ID della sessione corrente
    if (state.sessions.currentSessionId) {
      saveCurrentSessionId(state.sessions.currentSessionId);
    }

    if (import.meta.env.DEV) {
      console.log("💾 Auto-save triggered by:", action.type);
    }
  }

  return result;
};
