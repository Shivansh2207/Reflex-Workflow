"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "./AuthProvider";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ServiceWorkerRegistration } from "@/components/shared/ServiceWorkerRegistration";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider><QueryProvider><AuthProvider>{children}<Toaster richColors position="top-right" /><ServiceWorkerRegistration /></AuthProvider></QueryProvider></ThemeProvider>;
}
