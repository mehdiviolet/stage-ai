// src/lib/storage/sessions.js
import { local } from "./local";

/**
 * Chiavi localStorage per le sessioni
 */
const STORAGE_KEYS = {
  SESSIONS: "madgem_sessions",
  CURRENT_SESSION_ID: "madgem_current_session_id",
  SESSION_SETTINGS: "madgem_session_settings",
};

/**
 * Configurazione di default
 */
const DEFAULT_SETTINGS = {
  maxSessions: 50, // Limite massimo di sessioni salvate
  autoSave: true, // Salvataggio automatico
  autoTitleGeneration: true, // Genera titoli automaticamente
};

/**
 * Salva tutte le sessioni in localStorage
 */
export const saveSessions = (sessions) => {
  try {
    if (!Array.isArray(sessions)) {
      console.error("❌ saveSessions: sessions deve essere un array");
      return false;
    }

    // Limita il numero di sessioni salvate
    const settings = getSessionSettings();
    const sessionsToSave = sessions.slice(0, settings.maxSessions);

    local.set(STORAGE_KEYS.SESSIONS, sessionsToSave);

    if (import.meta.env.DEV) {
      console.log("💾 Sessioni salvate:", sessionsToSave.length);
    }

    return true;
  } catch (error) {
    console.error("❌ Errore nel salvare le sessioni:", error);
    return false;
  }
};

/**
 * Carica tutte le sessioni da localStorage
 */
export const loadSessions = () => {
  try {
    const sessions = local.get(STORAGE_KEYS.SESSIONS);

    if (!sessions || !Array.isArray(sessions)) {
      if (import.meta.env.DEV) {
        console.log("📭 Nessuna sessione salvata trovata");
      }
      return null;
    }

    if (import.meta.env.DEV) {
      console.log("📂 Sessioni caricate:", sessions.length);
    }

    return sessions;
  } catch (error) {
    console.error("❌ Errore nel caricare le sessioni:", error);
    return null;
  }
};

/**
 * Salva l'ID della sessione corrente
 */
export const saveCurrentSessionId = (sessionId) => {
  try {
    local.set(STORAGE_KEYS.CURRENT_SESSION_ID, sessionId);
    return true;
  } catch (error) {
    console.error("❌ Errore nel salvare current session ID:", error);
    return false;
  }
};

/**
 * Carica l'ID della sessione corrente
 */
export const loadCurrentSessionId = () => {
  try {
    return local.get(STORAGE_KEYS.CURRENT_SESSION_ID);
  } catch (error) {
    console.error("❌ Errore nel caricare current session ID:", error);
    return null;
  }
};

/**
 * Elimina una singola sessione
 */
export const deleteSessionFromStorage = (sessionId) => {
  try {
    const sessions = loadSessions();
    if (!sessions) return false;

    const filteredSessions = sessions.filter((s) => s.id !== sessionId);
    return saveSessions(filteredSessions);
  } catch (error) {
    console.error("❌ Errore nell'eliminare la sessione:", error);
    return false;
  }
};

/**
 * Pulisce tutte le sessioni salvate
 */
export const clearAllSessions = () => {
  try {
    local.del(STORAGE_KEYS.SESSIONS);
    local.del(STORAGE_KEYS.CURRENT_SESSION_ID);

    if (import.meta.env.DEV) {
      console.log("🗑️ Tutte le sessioni eliminate");
    }

    return true;
  } catch (error) {
    console.error("❌ Errore nel pulire le sessioni:", error);
    return false;
  }
};

/**
 * Salva le impostazioni delle sessioni
 */
export const saveSessionSettings = (settings) => {
  try {
    local.set(STORAGE_KEYS.SESSION_SETTINGS, {
      ...DEFAULT_SETTINGS,
      ...settings,
    });
    return true;
  } catch (error) {
    console.error("❌ Errore nel salvare session settings:", error);
    return false;
  }
};

/**
 * Carica le impostazioni delle sessioni
 */
export const getSessionSettings = () => {
  try {
    const saved = local.get(STORAGE_KEYS.SESSION_SETTINGS);
    return {
      ...DEFAULT_SETTINGS,
      ...saved,
    };
  } catch (error) {
    console.error("❌ Errore nel caricare session settings:", error);
    return DEFAULT_SETTINGS;
  }
};

/**
 * Esporta tutto lo stato delle sessioni (per backup/export)
 */
export const exportSessionsData = () => {
  try {
    return {
      sessions: loadSessions(),
      currentSessionId: loadCurrentSessionId(),
      settings: getSessionSettings(),
      exportedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("❌ Errore nell'esportare i dati:", error);
    return null;
  }
};

/**
 * Importa tutto lo stato delle sessioni (da backup/import)
 */
export const importSessionsData = (data) => {
  try {
    if (!data || !data.sessions) {
      throw new Error("Dati di import non validi");
    }

    saveSessions(data.sessions);

    if (data.currentSessionId) {
      saveCurrentSessionId(data.currentSessionId);
    }

    if (data.settings) {
      saveSessionSettings(data.settings);
    }

    if (import.meta.env.DEV) {
      console.log("📥 Dati importati con successo");
    }

    return true;
  } catch (error) {
    console.error("❌ Errore nell'importare i dati:", error);
    return false;
  }
};
