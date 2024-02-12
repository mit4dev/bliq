"use client";

import { ReactNode } from "react";
import ReactQueryClientProvider from "./QueryClientProvider";

export default function RootProvider({ children }: { children: ReactNode }) {
  return <ReactQueryClientProvider>{children}</ReactQueryClientProvider>;
}
