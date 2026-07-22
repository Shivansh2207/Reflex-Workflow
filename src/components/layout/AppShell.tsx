"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { AppSidebar } from "./AppSidebar";
import { TopHeader } from "./TopHeader";
import { MobileBottomNav } from "./MobileBottomNav";
export function AppShell({ children }: { children: React.ReactNode }) { const { employee, loading } = useAuth(); const router = useRouter(); const pathname = usePathname(); useEffect(() => { if (!loading && !employee) router.replace(`/login?next=${encodeURIComponent(pathname)}`); }, [employee,loading,pathname,router]); if (loading || !employee) return <div className="flex min-h-screen items-center justify-center bg-[#0b1117]"><LoaderCircle className="size-8 animate-spin text-[#17a9d6]" /></div>; if (employee.accountStatus !== "active") return <div className="flex min-h-screen items-center justify-center p-6"><div className="card max-w-md p-8 text-center"><h1 className="text-xl font-bold">Account access paused</h1><p className="mt-3 text-sm text-[var(--muted)]">Your account is {employee.accountStatus}. Contact an administrator for assistance.</p></div></div>; return <><AppSidebar /><TopHeader /><main className="min-h-[calc(100vh-72px)] lg:ml-[248px]">{children}</main><MobileBottomNav /></>; }
