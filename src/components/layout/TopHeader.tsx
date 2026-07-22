"use client";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { QuickTaskDialog } from "@/components/tasks/QuickTaskDialog";
import { useAuth } from "@/providers/AuthProvider";
export function TopHeader() { const { employee } = useAuth(); const { resolvedTheme, setTheme } = useTheme(); const [mounted,setMounted] = useState(false); useEffect(()=>setMounted(true),[]); return <header className="sticky top-0 z-30 flex h-[72px] items-center border-b bg-[var(--surface)]/90 px-4 backdrop-blur-xl sm:px-7 lg:ml-[248px]">
  <div className="flex items-center lg:hidden"><BrandLogo compact /><span className="ml-2 text-sm font-extrabold">Reflex Workspace</span></div><div className="hidden flex-1 md:block"><div className="relative max-w-md"><Search className="absolute left-3 top-3 size-4 text-[var(--muted)]" /><input className="control h-10 min-h-10 bg-[var(--surface-2)] pl-10 text-sm" placeholder="Search tasks, people, or projects…" aria-label="Search workspace" /><kbd className="absolute right-2.5 top-2 rounded border bg-[var(--surface)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">⌘ K</kbd></div></div>
  <div className="ml-auto flex items-center gap-1 sm:gap-2"><div className="hidden sm:block"><QuickTaskDialog /></div><button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="flex size-10 items-center justify-center rounded-xl text-[var(--muted)] hover:bg-[var(--surface-2)]" aria-label="Toggle theme">{mounted && resolvedTheme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}</button><button className="relative flex size-10 items-center justify-center rounded-xl text-[var(--muted)] hover:bg-[var(--surface-2)]" aria-label="Notifications"><Bell className="size-[18px]" /><span className="absolute right-2 top-2 size-2 rounded-full bg-[#ed2b2a] ring-2 ring-[var(--surface)]" /></button><Avatar name={employee?.fullName || "User"} size="md" className="ml-1" /></div>
</header>; }
