import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
  purple: "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
  red: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  orange: "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300",
  green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
};
export function Badge({ children, tone = "neutral", dot = false, className }: { children: ReactNode; tone?: keyof typeof tones; dot?: boolean; className?: string }) {
  return <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none", tones[tone], className)}>{dot && <span className="size-1.5 rounded-full bg-current" />}{children}</span>;
}
