"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const staleTime = 1000 * 60 * 5;

export default function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    // const queryClient =
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime,
            gcTime: staleTime * 2,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,

            // Information: disabled auto retry on purpose to manually handle in RideOptionList component
            retry: false,
          },
        },
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
