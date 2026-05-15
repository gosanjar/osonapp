import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./index.css"
import "@/shared/utils/date"
import App from "./App.tsx"
import { ThemeProvider } from "@/shared/providers/theme-provider.tsx"
import { LangProvider } from "@/shared/providers/lang-provider.tsx"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <LangProvider>
          <App />
        </LangProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
