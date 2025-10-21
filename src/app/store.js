// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import sessionReducer, {
  loadSessionsFromStorage,
} from "../features/sessions/sessionSlice";
import settingsReducer from "../features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    sessions: sessionReducer,
    settings: settingsReducer,
  },
});

// ✅ CARICA le sessioni salvate all'avvio
store.dispatch(loadSessionsFromStorage());

// ✅ SALVA automaticamente ad ogni cambio di stato
let previousState = store.getState().sessions;

store.subscribe(() => {
  const currentState = store.getState().sessions;

  // Salva solo se lo stato delle sessioni è cambiato
  if (currentState !== previousState) {
    try {
      localStorage.setItem("sessions", JSON.stringify(currentState));
      previousState = currentState;
    } catch (error) {
      console.error("Errore nel salvataggio sessioni:", error);
    }
  }
});
