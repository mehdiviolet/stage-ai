import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1500,
  headers: {
    "Content-type": "application/json",
  },
});

//Interceptor REQUEST esegue prima di ogni chiamata
apiClient.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Error", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response");
    return response;
  },
  (error) => {
    // const status = error?.response?.status;
    // const message = error?.response?.data?.message || error.message;

    return Promise.reject(error);
  }
);
