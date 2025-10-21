// src/features/sessions/sessionUtils.js

/**
 * Genera un titolo automatico per la sessione
 * Basato sul primo messaggio dell'utente o data/ora
 */
export const generateSessionTitle = (messages) => {
  // Trova il primo messaggio dell'utente
  const firstUserMessage = messages.find((msg) => msg.role === "user");

  if (firstUserMessage) {
    // Usa le prime 30 caratteri del messaggio
    const title = firstUserMessage.content.slice(0, 30);
    return title.length < firstUserMessage.content.length
      ? `${title}...`
      : title;
  }

  // Fallback: usa data e ora
  const now = new Date();
  return `Chat ${now.toLocaleDateString("it-IT")} ${now.toLocaleTimeString(
    "it-IT",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )}`;
};

/**
 * Crea una nuova sessione vuota
 */
export const createEmptySession = () => {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: "Nuova conversazione",
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Ciao! Sono MadGem, il tuo assistente AI. Come posso aiutarti oggi?",
        timestamp: now,
      },
    ],
  };
};

/**
 * Valida una sessione (controlla che abbia tutti i campi necessari)
 */
export const validateSession = (session) => {
  if (!session) return false;

  const requiredFields = ["id", "title", "createdAt", "updatedAt", "messages"];
  const hasAllFields = requiredFields.every((field) => field in session);

  if (!hasAllFields) return false;
  if (!Array.isArray(session.messages)) return false;

  return true;
};

/**
 * Ordina le sessioni per data di aggiornamento (più recenti prima)
 */
export const sortSessionsByDate = (sessions) => {
  return [...sessions].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
};

/**
 * Trova una sessione per ID
 */
export const findSessionById = (sessions, sessionId) => {
  return sessions.find((s) => s.id === sessionId);
};

/**
 * Aggiorna il timestamp di una sessione
 */
export const updateSessionTimestamp = (session) => {
  return {
    ...session,
    updatedAt: new Date().toISOString(),
  };
};
