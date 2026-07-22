"use client";
import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
export function OfflineBanner() { const online = useOnlineStatus(); return online ? null : <div className="fixed inset-x-0 top-0 z-[100] flex h-8 items-center justify-center gap-2 bg-amber-500 px-4 text-xs font-bold text-amber-950"><WifiOff className="size-3.5" />You’re offline. Recently viewed work remains available.</div>; }
