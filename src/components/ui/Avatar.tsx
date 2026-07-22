import Image from "next/image";
import { cn, initials } from "@/lib/utils";

export function Avatar({ name, src, size = "md", className }: { name: string; src?: string; size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const sizes = { sm: "size-7 text-[10px]", md: "size-9 text-xs", lg: "size-12 text-sm", xl: "size-20 text-xl" };
  return <div className={cn("relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-cyan-100 to-sky-200 text-cyan-800 flex items-center justify-center font-bold ring-1 ring-black/5", sizes[size], className)}>
    {src ? <Image src={src} alt={name} fill sizes="80px" className="object-cover" /> : initials(name)}
  </div>;
}
