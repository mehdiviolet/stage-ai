// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import sessionReducer, {
  loadSessionsFromStorage,
} from "../features/sessions/sessionSlice";
import settingsReducer from "../features/settings/settingsSlice";
import chatReducer from "../features/chat/chatSlice"; // ← AGGIUNGI QUESTO

export const store = configureStore({
  reducer: {
    sessions: sessionReducer,
    settings: settingsReducer,
    chat: chatReducer, // ← AGGIUNGI QUESTO
  },
});

// ✅ CARICA le sessioni salvate all'avvio
store.dispatch(loadSessionsFromStorage());

// ✅ SALVA automaticamente ad ogni cambio di stato
let previousState = store.getState().sessions;

store.subscribe(() => {
  const currentState = store.getState().sessions;

  if (currentState !== previousState) {
    try {
      localStorage.setItem("sessions", JSON.stringify(currentState));
      previousState = currentState;
    } catch (error) {
      console.error("Errore nel salvataggio sessioni:", error);
    }
  }
});
