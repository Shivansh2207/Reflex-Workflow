"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { getEmployee } from "@/services/employeeService";
import { demoEmployee } from "@/data/demo";
import type { Employee } from "@/types";

interface AuthContextValue { user: User | null; employee: Employee | null; loading: boolean; demoMode: boolean; }
const AuthContext = createContext<AuthContextValue>({ user: null, employee: null, loading: true, demoMode: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(demoMode ? demoEmployee : null);
  const [loading, setLoading] = useState(!demoMode);

  useEffect(() => {
    if (demoMode) return;
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser) { setEmployee(null); setLoading(false); return; }
      try { setEmployee(await getEmployee(nextUser.uid)); } finally { setLoading(false); }
    });
  }, [demoMode]);

  const value = useMemo(() => ({ user, employee, loading, demoMode }), [user, employee, loading, demoMode]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
