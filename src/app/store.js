// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatSlice";
import sessionReducer from "../features/sessions/sessionSlice";
import settingsReducer from "../features/settings/settingsSlice";
import { persistMiddleware } from "./middleware/persistMiddleware";
import { loadSessions, loadCurrentSessionId } from "../lib/storage/session";

/**
 * Preload state da localStorage
 */
const preloadedState = {};

// Carica le sessioni salvate
const savedSessions = loadSessions();
const savedCurrentSessionId = loadCurrentSessionId();

if (savedSessions && savedSessions.length > 0) {
  preloadedState.sessions = {
    items: savedSessions,
    currentSessionId: savedCurrentSessionId || savedSessions[0].id,
    isLoading: false,
    error: null,
  };

  if (import.meta.env.DEV) {
    console.log("📂 Stato precaricato da localStorage:", {
      sessioni: savedSessions.length,
      currentSessionId: preloadedState.sessions.currentSessionId,
    });
  }
}

/**
 * Configurazione Redux Store
 *
 * Redux DevTools abilitato automaticamente in development
 * Middleware thunk incluso di default
 */
export const store = configureStore({
  reducer: {
    // Aggiungi qui tutti i reducers dell'app
    chat: chatReducer,
    sessions: sessionReducer,
    settings: settingsReducer,
  },

  // Stato precaricato da localStorage
  preloadedState,

  // Middleware personalizzati (opzionale)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configurazioni middleware
      serializableCheck: {
        // Ignora queste action types per check serializzazione
        ignoredActions: ["chat/addMessage"],
      },
    }).concat(persistMiddleware), // ← Aggiungi middleware per auto-save

  // DevTools configurazione
  devTools: import.meta.env.DEV, // Solo in sviluppo
});

/**
 * Tipi inferiti per TypeScript (opzionale, per futuro)
 *
 * export type RootState = ReturnType<typeof store.getState>;
 * export type AppDispatch = typeof store.dispatch;
 */

// Log configurazione in dev
if (import.meta.env.DEV) {
  console.log("🏪 Redux Store configurato:", {
    reducers: Object.keys(store.getState()),
    devTools: "enabled",
  });
  console.log("📊 State iniziale:", store.getState());
}
