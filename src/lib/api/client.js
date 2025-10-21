// src/lib/api/client.js
import axios from "axios";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors";

/**
 * Configurazione base del client API
 */
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000, // 10 secondi
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * Istanza Axios configurata
 * Usata per tutte le chiamate API dell'applicazione
 */
const apiClient = axios.create(API_CONFIG);

// Aggiungi riferimento all'istanza axios per i retry
apiClient.interceptors.request.use((config) => {
  config.axios = apiClient;
  config._retryCount = 0;
  return requestInterceptor(config);
}, requestErrorInterceptor);

// Interceptor per le risposte
apiClient.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

/**
 * Helper methods per chiamate comuni
 */
export const api = {
  /**
   * GET request
   */
  get: (url, config = {}) => apiClient.get(url, config),

  /**
   * POST request
   */
  post: (url, data, config = {}) => apiClient.post(url, data, config),

  /**
   * PUT request
   */
  put: (url, data, config = {}) => apiClient.put(url, data, config),

  /**
   * PATCH request
   */
  patch: (url, data, config = {}) => apiClient.patch(url, data, config),

  /**
   * DELETE request
   */
  delete: (url, config = {}) => apiClient.delete(url, config),
};

/**
 * Esporta l'istanza configurata
 */
export { apiClient }; // Named export
export default apiClient;

/**
 * Info configurazione (per debugging)
 */
if (import.meta.env.DEV) {
  console.log("🔧 API Client configurato:", {
    baseURL: API_CONFIG.baseURL,
    timeout: `${API_CONFIG.timeout}ms`,
    mockEnabled: import.meta.env.VITE_ENABLE_MOCK === "true",
  });
}
