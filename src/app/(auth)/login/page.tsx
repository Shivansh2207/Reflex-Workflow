"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginInput } from "@/lib/validators";
import { useAuth } from "@/providers/AuthProvider";
import { friendlyAuthError, login } from "@/services/authService";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState(""); const router = useRouter(); const searchParams = useSearchParams(); const { employee, demoMode } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  useEffect(() => { if (employee && !demoMode) router.replace(searchParams.get("next") || "/dashboard"); }, [employee,demoMode,router,searchParams]);
  async function onSubmit(values: LoginInput) { setError(""); try { await login(values.email, values.password); } catch (reason) { setError(friendlyAuthError(reason)); } }
  return <main className="grid min-h-screen lg:grid-cols-[1.06fr_.94fr]">
    <section className="brand-grid relative hidden overflow-hidden bg-[#0b1117] p-14 lg:flex lg:flex-col">
      <div className="brand-orbit -left-16 top-44 h-64 w-[680px]" /><div className="brand-orbit left-28 top-32 h-96 w-[520px] rotate-12 opacity-50" />
      <div className="absolute -right-36 -top-40 size-[460px] rounded-full bg-[#17a9d6]/10 blur-3xl" /><div className="absolute -bottom-36 -left-20 size-[400px] rounded-full bg-[#0796c2]/10 blur-3xl" />
      <BrandLogo light className="relative z-10" />
      <div className="relative z-10 my-auto max-w-xl"><div className="mb-8 flex size-20 items-center justify-center rounded-[22px] border border-white/10 bg-white/[.04] shadow-2xl"><div className="relative size-11"><span className="absolute bottom-0 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-[#17a9d6]" /><span className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-[#ed2b2a]" /></div></div><h1 className="max-w-lg text-5xl font-extrabold leading-[1.08] tracking-[-.055em] text-white">Work moves better<br />when everyone is<br /><span className="text-[#17a9d6]">in sync.</span></h1><p className="mt-6 max-w-md text-[15px] leading-7 text-slate-400">Assign, discuss, and complete important work in one focused workspace built for your team.</p><div className="mt-10 flex gap-8">{["Clear ownership","Live progress","One shared view"].map((item) => <div key={item} className="flex items-center gap-2 text-xs font-medium text-slate-300"><CheckCircle2 className="size-4 text-[#17a9d6]" />{item}</div>)}</div></div>
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-600"><span>© 2026 Reflex Reality LLP</span><span>Secure internal workspace</span></div>
    </section>
    <section className="flex min-h-screen items-center justify-center bg-[var(--background)] p-5 sm:p-10"><div className="w-full max-w-[430px]">
      <BrandLogo className="mb-10 lg:hidden" /><div className="mb-8"><div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-[var(--surface)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]"><LockKeyhole className="size-3 text-[#0796c2]" />Internal access only</div><h2 className="text-3xl font-extrabold tracking-[-.045em]">Welcome back</h2><p className="mt-2 text-sm text-[var(--muted)]">Sign in with your Reflex Reality work account.</p></div>
      {demoMode ? <div className="card p-7"><h3 className="font-bold">Preview mode is active</h3><p className="mt-2 text-sm text-[var(--muted)]">You can enter the product preview without connecting a Firebase account.</p><Button className="mt-6 w-full" onClick={() => router.push("/dashboard")}>Open workspace <ArrowRight className="size-4" /></Button></div> : <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{error}</div>}
        <div><label className="label" htmlFor="email">Work email</label><div className="relative"><Mail className="absolute left-3.5 top-3.5 size-4 text-[var(--muted)]" /><input id="email" type="email" autoComplete="email" className="control h-12 pl-11" placeholder="name@reflexrealty.in" {...register("email")} /></div>{errors.email && <p className="field-error">{errors.email.message}</p>}</div>
        <div><div className="flex items-center justify-between"><label className="label" htmlFor="password">Password</label><Link href="/forgot-password" className="mb-2 text-xs font-semibold text-[#0796c2] hover:underline">Forgot password?</Link></div><div className="relative"><LockKeyhole className="absolute left-3.5 top-3.5 size-4 text-[var(--muted)]" /><input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" className="control h-12 px-11" placeholder="Enter your password" {...register("password")} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 flex size-6 items-center justify-center text-[var(--muted)]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div>{errors.password && <p className="field-error">{errors.password.message}</p>}</div>
        <label className="flex items-center gap-2 text-xs text-[var(--muted)]"><input type="checkbox" defaultChecked className="size-4 accent-[#0796c2]" />Keep me signed in on this device</label><Button type="submit" className="h-12 w-full" loading={isSubmitting}>Sign in securely <ArrowRight className="size-4" /></Button>
      </form>}
      <div className="mt-8 border-t pt-6 text-center"><p className="text-xs text-[var(--muted)]">Need access or having trouble? <span className="font-semibold text-[var(--foreground)]">Contact your administrator.</span></p></div>
    </div></section>
  </main>;
}
