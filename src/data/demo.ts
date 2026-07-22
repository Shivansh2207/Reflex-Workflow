import type { Announcement, Employee, Task } from "@/types";

const now = new Date();
const dateFromNow = (days: number) => new Date(now.getTime() + days * 86400000).toISOString();

export const demoEmployee: Employee = {
  uid: "demo-admin", employeeId: "RR-001", fullName: "Aarav Mehta", email: "aarav@reflexrealty.in", phone: "+91 98765 43210",
  designation: "Operations Manager", departmentId: "operations", departmentName: "Operations", role: "manager", reportingManagerName: "Ritika Sharma",
  skills: ["Operations", "Team planning", "Vendor management"], bio: "Keeping cross-functional work moving with clarity.", workLocation: "Mumbai HQ",
  availabilityStatus: "Available", accountStatus: "active", joinedAt: "2023-06-12", activeTaskCount: 8
};

export const demoEmployees: Employee[] = [
  demoEmployee,
  { uid: "emp-2", employeeId: "RR-014", fullName: "Nisha Patel", email: "nisha@reflexrealty.in", designation: "Senior Designer", departmentId: "design", departmentName: "Design", role: "employee", reportingManagerName: "Aarav Mehta", skills: ["Brand design", "Figma"], availabilityStatus: "Busy", accountStatus: "active", activeTaskCount: 5 },
  { uid: "emp-3", employeeId: "RR-019", fullName: "Vikram Singh", email: "vikram@reflexrealty.in", designation: "Sales Executive", departmentId: "sales", departmentName: "Sales", role: "employee", reportingManagerName: "Priya Nair", skills: ["Client relations", "Site visits"], availabilityStatus: "In Meeting", accountStatus: "active", activeTaskCount: 3 },
  { uid: "emp-4", employeeId: "RR-008", fullName: "Priya Nair", email: "priya@reflexrealty.in", designation: "Sales Manager", departmentId: "sales", departmentName: "Sales", role: "manager", skills: ["Sales strategy", "Negotiation"], availabilityStatus: "Working Remotely", accountStatus: "active", activeTaskCount: 7 },
  { uid: "emp-5", employeeId: "RR-025", fullName: "Kabir Joshi", email: "kabir@reflexrealty.in", designation: "Marketing Associate", departmentId: "marketing", departmentName: "Marketing", role: "employee", skills: ["Content", "Campaigns"], availabilityStatus: "Available", accountStatus: "active", activeTaskCount: 4 },
  { uid: "emp-6", employeeId: "RR-031", fullName: "Meera Iyer", email: "meera@reflexrealty.in", designation: "Frontend Developer", departmentId: "technology", departmentName: "Technology", role: "employee", skills: ["React", "Design systems"], availabilityStatus: "On Leave", accountStatus: "active", activeTaskCount: 2 }
];

const baseTask = { createdById: "demo-admin", createdByName: "Aarav Mehta", assignedToIds: ["demo-admin"], primaryAssigneeId: "demo-admin", departmentId: "operations", progressPercentage: 0, checklist: [], tags: [], attachments: [], watchers: ["demo-admin"], requiresApproval: false, isArchived: false, createdAt: dateFromNow(-8), updatedAt: dateFromNow(-1) };
export const demoTasks: Task[] = [
  { ...baseTask, id: "task-1", taskNumber: "RR-1048", title: "Finalize Q3 site visit schedule", description: "Coordinate with sales and operations to lock the schedule for all active property sites.", priority: "Urgent", status: "In Progress", dueDate: dateFromNow(0), progressPercentage: 65, projectName: "Office Operations", tags: ["Q3", "site-visits"], assignedToDetails: [{ id: "demo-admin", name: "Aarav Mehta" }] },
  { ...baseTask, id: "task-2", taskNumber: "RR-1052", title: "Review Andheri campaign creatives", description: "Review the new campaign set and share actionable feedback with design.", priority: "High", status: "Submitted for Review", dueDate: dateFromNow(1), progressPercentage: 90, projectName: "Client Property Campaign", assignedToIds: ["emp-2"], primaryAssigneeId: "emp-2", assignedToDetails: [{ id: "emp-2", name: "Nisha Patel" }], requiresApproval: true },
  { ...baseTask, id: "task-3", taskNumber: "RR-1039", title: "Update vendor onboarding checklist", description: "Bring the onboarding checklist in line with the new finance approval workflow.", priority: "Medium", status: "Blocked", dueDate: dateFromNow(-2), progressPercentage: 40, blockedReason: "Waiting for updated finance policy", tags: ["vendor", "operations"] },
  { ...baseTask, id: "task-4", taskNumber: "RR-1057", title: "Prepare weekly lead summary", description: "Consolidate new leads and site visit outcomes for the Monday review.", priority: "Medium", status: "Assigned", dueDate: dateFromNow(3), assignedToIds: ["emp-3"], primaryAssigneeId: "emp-3", departmentId: "sales", projectName: "Client Property Campaign", assignedToDetails: [{ id: "emp-3", name: "Vikram Singh" }] },
  { ...baseTask, id: "task-5", taskNumber: "RR-1028", title: "Publish internal website update", description: "Ship the revised team page after final content approval.", priority: "Low", status: "Completed", dueDate: dateFromNow(-1), progressPercentage: 100, departmentId: "technology", projectName: "Internal Website Update", completedAt: dateFromNow(-1), assignedToIds: ["emp-6"], primaryAssigneeId: "emp-6", assignedToDetails: [{ id: "emp-6", name: "Meera Iyer" }] }
];

export const demoAnnouncements: Announcement[] = [
  { id: "a-1", title: "Quarterly town hall", content: "Join us Friday at 4:00 PM in the main conference room for our quarterly company update.", audience: "Everyone", authorName: "People Operations", isPinned: true, createdAt: dateFromNow(-1) },
  { id: "a-2", title: "New task review workflow", content: "Tasks requiring approval now move through Submitted for Review before completion.", audience: "Everyone", authorName: "Workspace Admin", isPinned: false, createdAt: dateFromNow(-3) }
];
