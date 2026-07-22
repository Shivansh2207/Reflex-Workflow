export type UserRole = "admin" | "manager" | "employee";
export type AccountStatus = "invited" | "active" | "inactive" | "suspended";
export type AvailabilityStatus = "Available" | "Busy" | "In Meeting" | "Working Remotely" | "On Leave" | "Offline";
export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type TaskStatus = "Draft" | "Assigned" | "Accepted" | "In Progress" | "Blocked" | "Waiting" | "Submitted for Review" | "Changes Requested" | "Completed" | "Cancelled";

export interface Employee {
  uid: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone?: string;
  profilePhotoUrl?: string;
  designation: string;
  departmentId: string;
  departmentName?: string;
  role: UserRole;
  reportingManagerId?: string;
  reportingManagerName?: string;
  skills: string[];
  bio?: string;
  workLocation?: string;
  availabilityStatus: AvailabilityStatus;
  accountStatus: AccountStatus;
  joinedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  activeTaskCount?: number;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: string;
  order: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  path: string;
  size: number;
  contentType: string;
  uploadedBy: string;
  createdAt: string;
}

export interface Task {
  id: string;
  taskNumber: string;
  title: string;
  description: string;
  createdById: string;
  createdByName: string;
  assignedToIds: string[];
  assignedToDetails?: Array<{ id: string; name: string; photoUrl?: string }>;
  primaryAssigneeId: string;
  departmentId?: string;
  projectId?: string;
  projectName?: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate?: string;
  dueDate: string;
  estimatedTime?: number;
  actualTime?: number;
  progressPercentage: number;
  checklist: ChecklistItem[];
  tags: string[];
  attachments: Attachment[];
  watchers: string[];
  requiresApproval: boolean;
  reviewerId?: string;
  reviewerName?: string;
  blockedReason?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  submittedAt?: string;
  approvedAt?: string;
}

export interface Department { id: string; name: string; description?: string; managerId?: string; isActive: boolean; memberCount?: number; }
export interface Project { id: string; name: string; description?: string; departmentId?: string; status: "Planning" | "Active" | "On Hold" | "Completed"; progress: number; }
export interface TaskComment { id: string; taskId: string; authorId: string; authorName: string; authorPhoto?: string; content: string; mentions: string[]; attachments: Attachment[]; createdAt: string; updatedAt: string; isEdited: boolean; isDeleted: boolean; parentCommentId?: string; }
export interface AppNotification { id: string; userId: string; type: string; title: string; message: string; entityId?: string; read: boolean; createdAt: string; }
export interface Announcement { id: string; title: string; content: string; audience: string; authorName: string; isPinned: boolean; createdAt: string; }
export interface AuditLog { id: string; actorId: string; actorName: string; action: string; entityType: string; entityId: string; oldValue?: unknown; newValue?: unknown; createdAt: string; }
