import { StrictMode } from 'react'
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { router } from "./router/router"
import "./index.css"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 2, // 2 minutes (data stays "fresh")
			gcTime: 1000 * 60 * 10, // 10 minutes cache retention

			refetchOnWindowFocus: false, // prevents annoying refetches
			refetchOnReconnect: true,

			retry: 1,
		},
	},
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
