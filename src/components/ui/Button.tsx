import { forwardRef, type ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "icon"; loading?: boolean; }
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) {
  return <button ref={ref} disabled={disabled || loading} className={cn(
    "inline-flex items-center justify-center gap-2 rounded-[11px] font-semibold transition active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" && "brand-gradient text-white shadow-[0_8px_20px_rgba(7,150,194,.2)] hover:brightness-105",
    variant === "secondary" && "border bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-2)]",
    variant === "ghost" && "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
    variant === "danger" && "bg-[#d92525] text-white hover:bg-[#bf2020]",
    size === "sm" && "h-9 px-3 text-xs", size === "md" && "h-11 px-4 text-sm", size === "icon" && "size-10 p-0", className
  )} {...props}>{loading && <LoaderCircle className="size-4 animate-spin" />}{children}</button>;
});
