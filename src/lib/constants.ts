import type { TaskPriority, TaskStatus } from "@/types";

export const TASK_STATUSES: TaskStatus[] = ["Draft", "Assigned", "Accepted", "In Progress", "Blocked", "Waiting", "Submitted for Review", "Changes Requested", "Completed", "Cancelled"];
export const TASK_PRIORITIES: TaskPriority[] = ["Low", "Medium", "High", "Urgent"];
export const VOICE_LANGUAGES = [
  { value: "en-IN", label: "English (India)" },
  { value: "en-US", label: "English (US)" },
  { value: "hi-IN", label: "Hindi" },
  { value: "mr-IN", label: "Marathi" }
];

export const statusTone: Record<TaskStatus, string> = {
  Draft: "neutral", Assigned: "blue", Accepted: "cyan", "In Progress": "purple", Blocked: "red", Waiting: "amber",
  "Submitted for Review": "orange", "Changes Requested": "red", Completed: "green", Cancelled: "neutral"
};

export const priorityTone: Record<TaskPriority, string> = { Low: "neutral", Medium: "blue", High: "orange", Urgent: "red" };
