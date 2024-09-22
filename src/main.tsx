import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const theme = createTheme({
  fontFamily: "Lato, sans-serif",
  defaultRadius: "sm",
});

async function enableMocking() {
  if (import.meta.env.PROD || !import.meta.env.VITE_USE_MSW) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
          <App />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>,
  ),
);
