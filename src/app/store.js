// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatSlice";

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
    // Futuro: auth, settings, history, ecc.
  },

  // Middleware personalizzati (opzionale)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configurazioni middleware
      serializableCheck: {
        // Ignora queste action types per check serializzazione
        ignoredActions: ["chat/addMessage"],
      },
    }),

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
}
