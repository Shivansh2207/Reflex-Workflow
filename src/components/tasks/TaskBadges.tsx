import { Badge } from "@/components/ui/Badge";
import { priorityTone, statusTone } from "@/lib/constants";
import type { TaskPriority, TaskStatus } from "@/types";
export function StatusBadge({ status }: { status: TaskStatus }) { return <Badge tone={statusTone[status] as "neutral" | "blue" | "cyan" | "purple" | "red" | "amber" | "orange" | "green"} dot>{status}</Badge>; }
export function PriorityBadge({ priority }: { priority: TaskPriority }) { return <Badge tone={priorityTone[priority] as "neutral" | "blue" | "orange" | "red"}>{priority}</Badge>; }
