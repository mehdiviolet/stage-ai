// src/lib/api/errorHandler.js

/**
 * Classe per gestire errori API in modo centralizzato
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Mappa i codici di stato HTTP a messaggi user-friendly
 */
export const getErrorMessage = (
  status,
  defaultMessage = "Errore sconosciuto"
) => {
  const errorMessages = {
    400: "Richiesta non valida",
    401: "Non autorizzato. Effettua il login.",
    403: "Accesso negato",
    404: "Risorsa non trovata",
    408: "Timeout della richiesta",
    429: "Troppe richieste. Riprova più tardi.",
    500: "Errore del server",
    502: "Gateway non disponibile",
    503: "Servizio temporaneamente non disponibile",
  };

  return errorMessages[status] || defaultMessage;
};

/**
 * Handler centralizzato per errori API
 */
export const handleApiError = (error) => {
  // Errore di rete (no response dal server)
  if (!error.response) {
    console.error("❌ Errore di rete:", error.message);
    return new ApiError(
      "Impossibile connettersi al server. Verifica la connessione.",
      0,
      null
    );
  }

  // Errore HTTP con risposta dal server
  const { status, data } = error.response;
  const message = data?.message || getErrorMessage(status);

  console.error(`❌ Errore API [${status}]:`, message);

  return new ApiError(message, status, data);
};
