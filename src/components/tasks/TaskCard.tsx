import Link from "next/link";
import { CalendarDays, MessageSquare } from "lucide-react";
import { format, isPast, isToday } from "date-fns";
import { Avatar } from "@/components/ui/Avatar";
import { PriorityBadge, StatusBadge } from "./TaskBadges";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";

export function TaskCard({ task, compact = false }: { task: Task; compact?: boolean }) {
  const due = new Date(task.dueDate); const overdue = isPast(due) && task.status !== "Completed" && !isToday(due);
  return <Link href={`/tasks/${task.id}`} className="subtle-card group block p-4 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_10px_25px_rgba(23,169,214,.09)]">
    <div className="mb-3 flex items-start justify-between gap-3"><div className="min-w-0"><div className="mb-1 text-[11px] font-bold tracking-wide text-[var(--muted)]">{task.taskNumber}</div><h3 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-[#0796c2]">{task.title}</h3></div><PriorityBadge priority={task.priority} /></div>
    {!compact && <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">{task.description}</p>}
    <div className="mb-4"><div className="mb-1.5 flex justify-between text-[10px] font-semibold text-[var(--muted)]"><span>Progress</span><span>{task.progressPercentage}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full rounded-full bg-[#17a9d6]" style={{ width: `${task.progressPercentage}%` }} /></div></div>
    <div className="flex items-center justify-between gap-3"><StatusBadge status={task.status} /><div className="flex items-center gap-3"><span className={cn("flex items-center gap-1 text-[11px] font-medium", overdue ? "text-red-600" : "text-[var(--muted)]")}><CalendarDays className="size-3.5" />{isToday(due) ? "Today" : format(due, "d MMM")}</span><span className="flex items-center gap-1 text-[11px] text-[var(--muted)]"><MessageSquare className="size-3.5" />{task.id === "task-1" ? 6 : 2}</span>{task.assignedToDetails?.[0] && <Avatar name={task.assignedToDetails[0].name} size="sm" />}</div></div>
  </Link>;
}
