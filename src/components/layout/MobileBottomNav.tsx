"use client";
import Link from "next/link";
import { Bell, CheckSquare2, Home, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { QuickTaskDialog } from "@/components/tasks/QuickTaskDialog";
import { cn } from "@/lib/utils";
const links = [{ href: "/dashboard", label: "Home", icon: Home }, { href: "/tasks", label: "Tasks", icon: CheckSquare2 }, { href: "/employees", label: "Team", icon: Users }, { href: "/notifications", label: "Alerts", icon: Bell }];
export function MobileBottomNav() { const pathname = usePathname(); return <nav className="fixed inset-x-3 bottom-3 z-40 flex h-[70px] items-center justify-around rounded-[22px] border border-white/10 bg-[#0b1117]/95 px-2 shadow-2xl backdrop-blur-xl lg:hidden">{links.slice(0,2).map(({href,label,icon:Icon}) => <Link key={href} href={href} className={cn("flex w-14 flex-col items-center gap-1 text-[9px] font-bold", pathname.startsWith(href) ? "text-[#17a9d6]" : "text-[#82929e]")}><Icon className="size-5" />{label}</Link>)}<QuickTaskDialog triggerClassName="-mt-7 size-14 rounded-full px-0 text-[0px] [&_svg]:size-6" />{links.slice(2).map(({href,label,icon:Icon}) => <Link key={href} href={href} className={cn("flex w-14 flex-col items-center gap-1 text-[9px] font-bold", pathname.startsWith(href) ? "text-[#17a9d6]" : "text-[#82929e]")}><Icon className="size-5" />{label}</Link>)}</nav>; }
