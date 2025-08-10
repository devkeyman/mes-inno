import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";
import AppRouter from "./router";
import { queryClient } from "@/shared/config/query-client";
import { ErrorBoundary } from "@/shared/components";

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
