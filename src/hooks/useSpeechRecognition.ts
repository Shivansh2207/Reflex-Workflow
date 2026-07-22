"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SpeechRecognitionEventLike extends Event { results: SpeechRecognitionResultList; resultIndex: number; }
interface SpeechRecognitionErrorEventLike extends Event { error: string; message: string; }
interface RecognitionLike {
  continuous: boolean; interimResults: boolean; lang: string;
  start(): void; stop(): void; abort(): void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
}
type RecognitionConstructor = new () => RecognitionLike;

declare global { interface Window { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor; } }

function cleanTranscript(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : "";
}

export function useSpeechRecognition(options: { language?: string; onFinal?: (text: string) => void } = {}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognition = useRef<RecognitionLike | null>(null);
  const onFinalRef = useRef(options.onFinal);
  onFinalRef.current = options.onFinal;

  useEffect(() => { setSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)); }, []);

  const start = useCallback(() => {
    const Constructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Constructor) { setError("Voice typing is not supported in this browser. You can continue typing manually."); return; }
    recognition.current?.abort();
    const instance = new Constructor();
    instance.continuous = true; instance.interimResults = true; instance.lang = options.language || "en-IN";
    instance.onresult = (event) => {
      let interim = ""; let completed = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript;
        if (event.results[index].isFinal) completed += transcript; else interim += transcript;
      }
      setInterimTranscript(interim);
      if (completed) { const clean = cleanTranscript(completed); setFinalTranscript((current) => `${current} ${clean}`.trim()); onFinalRef.current?.(clean); }
    };
    instance.onerror = (event) => {
      const messages: Record<string, string> = { "not-allowed": "Microphone permission was denied.", "audio-capture": "No microphone was found.", "no-speech": "No speech was detected. Please try again.", network: "Voice recognition needs a network connection." };
      setError(messages[event.error] || "Voice recognition stopped unexpectedly. Please try again."); setListening(false);
    };
    instance.onend = () => setListening(false);
    recognition.current = instance; setError(null); setInterimTranscript(""); setFinalTranscript("");
    try { instance.start(); setListening(true); } catch { setError("Voice recognition is already active."); }
  }, [options.language]);

  const stop = useCallback(() => recognition.current?.stop(), []);
  const cancel = useCallback(() => { recognition.current?.abort(); setListening(false); setInterimTranscript(""); setFinalTranscript(""); }, []);
  useEffect(() => () => recognition.current?.abort(), []);
  return { supported, listening, interimTranscript, finalTranscript, error, start, stop, cancel };
}
