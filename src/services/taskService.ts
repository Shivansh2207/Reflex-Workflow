import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/lib/firebase";
import type { Employee, Task, TaskStatus } from "@/types";
import type { TaskInput } from "@/lib/validators";
import { isValidTransition } from "@/lib/permissions";

function mapTask(id: string, data: Record<string, unknown>): Task {
  const date = (value: unknown) => value && typeof value === "object" && "toDate" in value ? (value as { toDate(): Date }).toDate().toISOString() : String(value || "");
  return { id, ...data, createdAt: date(data.createdAt), updatedAt: date(data.updatedAt), dueDate: date(data.dueDate) } as Task;
}

export async function listMyTasks(user: Employee) {
  const clauses = user.role === "admin" ? [] : [where("assignedToIds", "array-contains", user.uid)];
  const snapshot = await getDocs(query(collection(db, "tasks"), ...clauses, where("isArchived", "==", false), orderBy("updatedAt", "desc"), limit(100)));
  return snapshot.docs.map((item) => mapTask(item.id, item.data()));
}

export function subscribeToMyTasks(user: Employee, callback: (tasks: Task[]) => void, onError?: (error: Error) => void) {
  const clauses = user.role === "admin" ? [] : [where("assignedToIds", "array-contains", user.uid)];
  return onSnapshot(query(collection(db, "tasks"), ...clauses, where("isArchived", "==", false), orderBy("updatedAt", "desc"), limit(100)),
    (snapshot) => callback(snapshot.docs.map((item) => mapTask(item.id, item.data()))), onError);
}

export async function getTask(id: string) {
  const snapshot = await getDoc(doc(db, "tasks", id));
  return snapshot.exists() ? mapTask(snapshot.id, snapshot.data()) : null;
}

export async function createTask(input: TaskInput, creator: Employee, assignee?: Employee) {
  const now = new Date().toISOString();
  const data = {
    title: input.title, description: input.description, createdById: creator.uid, createdByName: creator.fullName,
    assignedToIds: [input.assigneeId], assignedToDetails: [{ id: input.assigneeId, name: assignee?.fullName || "Assigned employee" }], primaryAssigneeId: input.assigneeId,
    departmentId: assignee?.departmentId || creator.departmentId, projectName: input.projectName || "", priority: input.priority, status: "Assigned" as TaskStatus,
    startDate: input.startDate || now, dueDate: new Date(input.dueDate).toISOString(), progressPercentage: 0, checklist: [],
    tags: input.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) || [], attachments: [], watchers: [creator.uid],
    requiresApproval: input.requiresApproval, isArchived: false
  };
  const createSecureTask = httpsCallable<typeof data, { id: string; taskNumber: string }>(functions, "createTaskWithNumber");
  const created = await createSecureTask(data);
  return created.data.id;
}

export async function updateTaskStatus(task: Task, next: TaskStatus) {
  if (!isValidTransition(task.status, next, task.requiresApproval)) throw new Error(`Status cannot move from ${task.status} to ${next}.`);
  await updateDoc(doc(db, "tasks", task.id), {
    status: next, updatedAt: serverTimestamp(),
    ...(next === "Completed" ? { completedAt: serverTimestamp(), progressPercentage: 100 } : {}),
    ...(next === "Submitted for Review" ? { submittedAt: serverTimestamp() } : {})
  });
}
