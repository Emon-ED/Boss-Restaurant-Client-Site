import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider.jsx";
import {
QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <div className="max-w-screen-xl mx-auto bg-white text-black dark:bg-[#0C1417] dark:text-white">
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
          <RouterProvider router={router}></RouterProvider>
      </HelmetProvider>
      </QueryClientProvider>
     
    </AuthProvider>
        </div>
  </StrictMode>
);
