import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { ChatPage } from "../pages/ChatPage";
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
    // Login senza layout (full page)
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
    // 404 - Pagina non trovata
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
