"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
export default function GlobalError({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className="flex min-h-screen items-center justify-center p-6"><div className="card max-w-md p-8 text-center"><AlertTriangle className="mx-auto size-8 text-red-500"/><h1 className="mt-4 text-xl font-extrabold">Something went wrong</h1><p className="mt-2 text-sm text-[var(--muted)]">The workspace could not load this view. Your data has not been changed.</p><Button className="mt-6" onClick={reset}>Try again</Button></div></main>}
