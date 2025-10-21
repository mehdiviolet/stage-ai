// src/features/chat/api.js
import { api } from "../../lib/api/client";

// Nota: 'api' è l'oggetto helper esportato da client.js
// Non confondere con apiClient (istanza axios raw)

/**
 * Flag per abilitare mock da .env
 */
const MOCK_ENABLED = import.meta.env.VITE_ENABLE_MOCK === "true";

/**
 * Risposte mock simulate per sviluppo
 */
const MOCK_RESPONSES = [
  "Ciao! Sono MadGem, il tuo assistente AI. Come posso aiutarti oggi?",
  "Interessante domanda! Lasciami pensare...",
  "Capisco perfettamente quello che mi stai chiedendo.",
  "Ecco cosa penso a riguardo:",
  "Ottima osservazione! Ti spiego meglio:",
  "Non sono sicuro di aver capito bene. Puoi riformulare?",
  "Questa è una funzionalità che implementeremo presto!",
  "Sto ancora imparando, ma farò del mio meglio per aiutarti.",
];

/**
 * Simula una risposta AI con delay variabile
 */
const getMockResponse = (userMessage) => {
  // Seleziona risposta casuale o basata sul messaggio
  let response;

  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("ciao") || lowerMessage.includes("hello")) {
    response = "Ciao! Come posso aiutarti oggi?";
  } else if (
    lowerMessage.includes("come stai") ||
    lowerMessage.includes("come va")
  ) {
    response =
      "Sto benissimo, grazie per averlo chiesto! Sono sempre pronto ad aiutarti. 😊";
  } else if (lowerMessage.includes("aiuto") || lowerMessage.includes("help")) {
    response =
      "Certo! Sono qui per aiutarti. Dimmi cosa ti serve e farò del mio meglio per assisterti.";
  } else if (
    lowerMessage.includes("grazie") ||
    lowerMessage.includes("thanks")
  ) {
    response =
      "Prego! È un piacere aiutarti. Se hai altre domande, sono qui! 🙂";
  } else {
    // Risposta casuale per altri messaggi
    response =
      MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    response += `\n\n💭 Hai scritto: "${userMessage}"`;
  }

  return response;
};

/**
 * Simula delay di rete (500ms - 2000ms)
 */
const simulateNetworkDelay = () => {
  const delay = Math.random() * 1500 + 500; // 500-2000ms
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * API Mock - Simula chiamata POST /chat/ask
 */
const mockChatAsk = async (message) => {
  console.log("🤖 [MOCK] Chiamata /chat/ask con messaggio:", message);

  // Simula delay di rete
  await simulateNetworkDelay();

  // Simula errore casuale (5% probabilità) per testare error handling
  if (Math.random() < 0.05) {
    throw new Error("Errore simulato: il server non risponde");
  }

  // Genera risposta mock
  const response = getMockResponse(message);

  console.log("✅ [MOCK] Risposta generata:", response);

  return {
    data: {
      message: response,
      timestamp: new Date().toISOString(),
      model: "madgem-mock-v1",
    },
  };
};

/**
 * API Reale - Chiamata POST /chat/ask
 */
const realChatAsk = async (message) => {
  const response = await api.post("/chat/ask", {
    message,
    timestamp: new Date().toISOString(),
  });

  return response;
};

/**
 * Funzione principale per inviare messaggio alla chat
 * Switch automatico tra mock e API reale
 *
 * @param {string} message - Messaggio dell'utente
 * @returns {Promise<object>} - Risposta dell'AI
 */
export const sendChatMessage = async (message) => {
  try {
    if (MOCK_ENABLED) {
      console.log("🎭 Modalità MOCK attiva");
      return await mockChatAsk(message);
    } else {
      console.log("🌐 Modalità API REALE attiva");
      return await realChatAsk(message);
    }
  } catch (error) {
    console.error("❌ Errore in sendChatMessage:", error);
    throw error;
  }
};

/**
 * Funzione per creare una nuova sessione di chat (futuro)
 */
export const createChatSession = async () => {
  if (MOCK_ENABLED) {
    await simulateNetworkDelay();
    return {
      data: {
        sessionId: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    };
  }

  return await api.post("/chat/sessions");
};

/**
 * Funzione per recuperare storico chat (futuro)
 */
export const getChatHistory = async (sessionId) => {
  if (MOCK_ENABLED) {
    await simulateNetworkDelay();
    return {
      data: {
        messages: [],
        sessionId,
      },
    };
  }

  return await api.get(`/chat/sessions/${sessionId}/messages`);
};
