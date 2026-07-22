"use client";

import { useEffect, useState } from "react";
export function useOnlineStatus() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    setOnline(navigator.onLine);
    const connect = () => setOnline(true); const disconnect = () => setOnline(false);
    window.addEventListener("online", connect); window.addEventListener("offline", disconnect);
    return () => { window.removeEventListener("online", connect); window.removeEventListener("offline", disconnect); };
  }, []);
  return online;
}
