import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({ compact = false, light = false, className }: { compact?: boolean; light?: boolean; className?: string }) {
  return <div className={cn("flex items-center gap-3", className)}>
    <div className={cn("relative shrink-0 overflow-hidden rounded-xl bg-white", compact ? "size-10" : "size-12")}>
      <Image src="/logo/reflex-logo.png" alt="Reflex Reality LLP" fill priority sizes="48px" className="object-cover object-[50%_12%] scale-[1.8]" />
    </div>
    {!compact && <div><div className={cn("text-lg font-extrabold tracking-tight", light ? "text-white" : "text-[var(--foreground)]")}>Reflex <span className="text-[#17a9d6]">Workspace</span></div><div className={cn("text-[10px] font-medium tracking-[.14em] uppercase", light ? "text-slate-400" : "text-[var(--muted)]")}>Reflex Reality LLP</div></div>}
  </div>;
}
