"use client";

import { Mic, Square, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { cn } from "@/lib/utils";

export function VoiceInputButton({ onTranscript, language = "en-IN", compact = false }: { onTranscript: (text: string) => void; language?: string; compact?: boolean }) {
  const speech = useSpeechRecognition({ language, onFinal: onTranscript });
  if (!speech.listening) return <div className="relative"><Button type="button" variant="ghost" size={compact ? "icon" : "sm"} onClick={speech.start} aria-label="Start voice typing" title={speech.supported ? "Voice type" : "Voice typing may not be supported"} className="text-[#0796c2]"><Mic className="size-4" />{!compact && "Voice type"}</Button>{speech.error && !compact && <p className="absolute right-0 top-11 z-20 w-72 rounded-lg border bg-[var(--surface)] p-3 text-xs text-red-600 shadow-xl">{speech.error}</p>}</div>;
  return <div className="absolute inset-x-0 bottom-full z-30 mb-2 rounded-xl border border-red-200 bg-[var(--surface)] p-3 shadow-xl">
    <div className="flex items-center gap-3"><span className="listening-ring relative flex size-9 items-center justify-center rounded-full bg-red-500 text-white"><Mic className="relative z-10 size-4" /></span><div className="min-w-0 flex-1"><div className="text-xs font-bold text-red-600">Listening…</div><div className="truncate text-xs text-[var(--muted)]">{speech.interimTranscript || speech.finalTranscript || "Start speaking"}</div></div><button type="button" onClick={speech.stop} className={cn("flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600")} aria-label="Stop voice typing"><Square className="size-3.5 fill-current" /></button><button type="button" onClick={speech.cancel} className="flex size-8 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-2)]" aria-label="Cancel voice typing"><X className="size-4" /></button></div>
    <p className="mt-2 text-[10px] text-[var(--muted)]">Please review names, dates, and technical terms before creating the task.</p>
  </div>;
}
