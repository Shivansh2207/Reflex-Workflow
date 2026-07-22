import type { Employee, Task, TaskStatus, UserRole } from "@/types";

export function canViewAllTasks(role: UserRole) { return role === "admin"; }
export function canManageEmployees(role: UserRole) { return role === "admin"; }
export function canViewReports(role: UserRole) { return role === "admin" || role === "manager"; }
export function canAssignAcrossDepartments(role: UserRole, allowEveryone = false) { return allowEveryone || role !== "employee"; }
export function canViewTask(user: Employee, task: Task) {
  return user.role === "admin" || task.createdById === user.uid || task.assignedToIds.includes(user.uid) || (user.role === "manager" && task.departmentId === user.departmentId);
}
export function canApproveTask(user: Employee, task: Task) {
  return user.role === "admin" || task.reviewerId === user.uid || (user.role === "manager" && task.departmentId === user.departmentId);
}

const transitions: Record<TaskStatus, TaskStatus[]> = {
  Draft: ["Assigned", "Cancelled"], Assigned: ["Accepted", "Cancelled"], Accepted: ["In Progress", "Cancelled"],
  "In Progress": ["Blocked", "Waiting", "Submitted for Review", "Completed", "Cancelled"],
  Blocked: ["In Progress", "Cancelled"], Waiting: ["In Progress", "Cancelled"],
  "Submitted for Review": ["Changes Requested", "Completed"], "Changes Requested": ["In Progress", "Cancelled"],
  Completed: [], Cancelled: []
};

export function isValidTransition(from: TaskStatus, to: TaskStatus, requiresApproval = false) {
  if (requiresApproval && from === "In Progress" && to === "Completed") return false;
  return transitions[from].includes(to);
}
