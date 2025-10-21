// src/routes/index.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import ChatPage from "../features/chat/ChatPage"; // ← CAMBIATO: ora importa da features
import { LoginPage } from "../pages/LoginPage";
import { HistoryPage } from "../pages/HistoryPage";
import { SettingsPage } from "../pages/SettingsPage";

/**
 * Configurazione router dell'applicazione
 * Tutte le pagine (tranne login) sono wrappate in AppLayout
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <ChatPage />
      </AppLayout>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/history",
    element: (
      <AppLayout>
        <HistoryPage />
      </AppLayout>
    ),
  },
  {
    path: "/settings",
    element: (
      <AppLayout>
        <SettingsPage />
      </AppLayout>
    ),
  },
  {
    path: "*",
    element: (
      <AppLayout>
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>404</h1>
          <p>Pagina non trovata</p>
        </div>
      </AppLayout>
    ),
  },
]);

/**
 * Componente AppRouter
 * Esporta il RouterProvider configurato
 */
export function AppRouter() {
  return <RouterProvider router={router} />;
}
