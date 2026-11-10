"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./query-client";
import { createTrpcClient, trpc } from "./trpc-client";
import type { TrpcProviderProps } from "./types";

export default function TrpcProvider({ children }: TrpcProviderProps) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() => createTrpcClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
