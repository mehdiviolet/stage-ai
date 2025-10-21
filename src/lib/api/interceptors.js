// src/lib/api/interceptors.js
import { handleApiError } from "./errorHandler";

/**
 * Interceptor per le richieste
 * Aggiunge headers comuni, logging, timestamp
 */
export const requestInterceptor = (config) => {
  // Aggiungi timestamp per debugging
  config.metadata = { startTime: new Date() };

  // Log in sviluppo
  if (import.meta.env.DEV) {
    console.log("🚀 API Request:", {
      method: config.method.toUpperCase(),
      url: config.url,
      data: config.data,
    });
  }

  // Aggiungi headers custom (es: client info)
  config.headers["X-Client"] = "AI-Platform-Web";
  config.headers["X-Request-ID"] = crypto.randomUUID();

  // Se c'è un token in localStorage, aggiungilo (futuro)
  // const token = localStorage.getItem('auth_token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
};

/**
 * Interceptor per errori di richiesta
 */
export const requestErrorInterceptor = (error) => {
  console.error("❌ Errore preparazione richiesta:", error);
  return Promise.reject(error);
};

/**
 * Interceptor per le risposte di successo
 * Calcola durata richiesta, logging
 */
export const responseInterceptor = (response) => {
  // Calcola durata
  const duration = new Date() - response.config.metadata.startTime;

  // Log in sviluppo
  if (import.meta.env.DEV) {
    console.log("✅ API Response:", {
      method: response.config.method.toUpperCase(),
      url: response.config.url,
      status: response.status,
      duration: `${duration}ms`,
      data: response.data,
    });
  }

  return response;
};

/**
 * Interceptor per errori di risposta
 * Gestisce 401, 403, retry, ecc.
 */
export const responseErrorInterceptor = async (error) => {
  const originalRequest = error.config;

  // Se è un timeout o errore di rete, riprova
  if (
    !error.response &&
    !originalRequest._retry &&
    originalRequest._retryCount < 2
  ) {
    originalRequest._retry = true;
    originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

    console.warn(
      `⚠️ Retry ${originalRequest._retryCount}/2 per:`,
      originalRequest.url
    );

    // Aspetta un po' prima di riprovare (exponential backoff)
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 * originalRequest._retryCount)
    );

    return error.config.axios(originalRequest);
  }

  // Gestione errore 401 (Unauthorized) - futuro
  // if (error.response?.status === 401) {
  //   // Redirect a login o refresh token
  //   console.warn('⚠️ Non autorizzato, redirect a login');
  //   window.location.href = '/login';
  // }

  // Passa l'errore all'handler centralizzato
  const apiError = handleApiError(error);
  return Promise.reject(apiError);
};
