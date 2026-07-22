"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Building2, CheckSquare2, ClipboardCheck, FileBarChart, FolderKanban, LayoutDashboard, LogOut, Megaphone, Settings, ShieldCheck, Users } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/providers/AuthProvider";
import { logout } from "@/services/authService";
import { cn } from "@/lib/utils";

const main = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }, { href: "/tasks", label: "My Tasks", icon: CheckSquare2 }, { href: "/projects", label: "Projects", icon: FolderKanban }, { href: "/employees", label: "Team", icon: Users }, { href: "/announcements", label: "Announcements", icon: Megaphone }
];
const management = [{ href: "/departments", label: "Departments", icon: Building2 }, { href: "/reports", label: "Reports", icon: FileBarChart }, { href: "/approvals", label: "Approvals", icon: ClipboardCheck }];
const admin = [{ href: "/admin/employees", label: "Employees", icon: Users }, { href: "/admin/audit", label: "Audit logs", icon: ShieldCheck }];

function NavItem({ href, label, icon: Icon }: (typeof main)[number]) { const pathname = usePathname(); const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`)); return <Link href={href} className={cn("relative flex h-10 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition", active ? "bg-[#17a9d6]/12 text-white" : "text-[#9aabb7] hover:bg-white/5 hover:text-white")}><Icon className={cn("size-[17px]", active && "text-[#17a9d6]")} />{label}{active && <span className="absolute -left-4 h-5 w-1 rounded-r-full bg-[#17a9d6]" />}</Link>; }

export function AppSidebar() {
  const { employee, demoMode } = useAuth();
  return <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col bg-[#0b1117] px-4 py-5 lg:flex">
    <BrandLogo light className="mb-8 px-1" />
    <nav className="flex-1 space-y-6 overflow-y-auto"><div className="space-y-1">{main.map((item) => <NavItem key={item.href} {...item} />)}</div>
      {employee?.role !== "employee" && <div><div className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[.18em] text-slate-600">Management</div><div className="space-y-1">{management.map((item) => <NavItem key={item.href} {...item} />)}</div></div>}
      {employee?.role === "admin" && <div><div className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[.18em] text-slate-600">Admin</div><div className="space-y-1">{admin.map((item) => <NavItem key={item.href} {...item} />)}</div></div>}
    </nav>
    <div className="space-y-1 border-t border-white/8 pt-4"><NavItem href="/notifications" label="Notifications" icon={Bell} /><NavItem href="/settings" label="Settings" icon={Settings} />
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/[.035] p-3"><Avatar name={employee?.fullName || "User"} size="md" /><div className="min-w-0 flex-1"><div className="truncate text-xs font-bold text-white">{employee?.fullName}</div><div className="truncate text-[10px] text-[#71818d]">{demoMode ? "Preview workspace" : employee?.designation}</div></div>{!demoMode && <button onClick={() => logout()} className="text-[#71818d] hover:text-white" aria-label="Log out"><LogOut className="size-4" /></button>}</div>
    </div>
  </aside>;
}
