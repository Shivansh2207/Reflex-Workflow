import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";

initializeApp({ credential: applicationDefault(), projectId: process.env.GCLOUD_PROJECT || "reflex-task-ef13d" });
const db = getFirestore();
const withAuth = process.argv.includes("--with-auth");
const departments = ["Management", "Sales", "Marketing", "Operations", "Design", "Technology", "Administration"];
const employees = [
  { employeeId: "RR-001", fullName: "Workspace Admin", email: "admin@reflexrealty.in", designation: "Administrator", departmentName: "Management", role: "admin" },
  { employeeId: "RR-002", fullName: "Operations Manager", email: "manager.operations@reflexrealty.in", designation: "Operations Manager", departmentName: "Operations", role: "manager" },
  { employeeId: "RR-003", fullName: "Sales Manager", email: "manager.sales@reflexrealty.in", designation: "Sales Manager", departmentName: "Sales", role: "manager" },
  { employeeId: "RR-004", fullName: "Design Employee", email: "designer@reflexrealty.in", designation: "Senior Designer", departmentName: "Design", role: "employee" },
  { employeeId: "RR-005", fullName: "Marketing Employee", email: "marketing@reflexrealty.in", designation: "Marketing Associate", departmentName: "Marketing", role: "employee" }
];
const projects = ["Client Property Campaign", "Internal Website Update", "Social Media Planning", "Office Operations"];

async function seed() {
  const departmentIds = new Map<string, string>();
  for (const name of departments) {
    const id = name.toLowerCase().replaceAll(" ", "-"); departmentIds.set(name, id);
    await db.doc(`departments/${id}`).set({ name, isActive: true, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  }
  const createdEmployees: string[] = [];
  for (const employee of employees) {
    let uid = `seed-${employee.employeeId.toLowerCase()}`;
    if (withAuth) {
      try { uid = (await getAuth().getUserByEmail(employee.email)).uid; }
      catch { uid = (await getAuth().createUser({ email: employee.email, password: "ChangeMe!2026", displayName: employee.fullName })).uid; }
    }
    createdEmployees.push(uid);
    await db.doc(`employees/${uid}`).set({ uid, ...employee, departmentId: departmentIds.get(employee.departmentName), skills: [], availabilityStatus: "Available", accountStatus: "active", createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  }
  for (const name of projects) {
    const id = name.toLowerCase().replaceAll(" ", "-");
    await db.doc(`projects/${id}`).set({ name, description: `Seed project: ${name}`, status: "Active", progress: 25, createdAt: FieldValue.serverTimestamp() }, { merge: true });
  }
  const now = Date.now();
  const samples = [
    { title: "Prepare weekly operations summary", status: "Assigned", priority: "Medium", days: 2 },
    { title: "Review campaign creative exports", status: "Submitted for Review", priority: "High", days: 1 },
    { title: "Confirm property site visit schedule", status: "In Progress", priority: "Urgent", days: 0 }
  ];
  for (let index = 0; index < samples.length; index += 1) {
    const sample = samples[index]; const id = `seed-task-${index + 1}`;
    await db.doc(`tasks/${id}`).set({ taskNumber: `RR-${String(index + 1).padStart(4, "0")}`, title: sample.title, description: sample.title, createdById: createdEmployees[0], createdByName: employees[0].fullName, assignedToIds: [createdEmployees[(index % (createdEmployees.length - 1)) + 1]], primaryAssigneeId: createdEmployees[(index % (createdEmployees.length - 1)) + 1], departmentId: departmentIds.get(employees[(index % (employees.length - 1)) + 1].departmentName), priority: sample.priority, status: sample.status, dueDate: Timestamp.fromMillis(now + sample.days * 86400000), progressPercentage: sample.status === "In Progress" ? 45 : 0, checklist: [], tags: ["seed"], attachments: [], watchers: [createdEmployees[0]], requiresApproval: sample.status === "Submitted for Review", isArchived: false, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  }
  await db.doc("taskCounters/tasks").set({ value: samples.length, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  await db.doc("organizationSettings/general").set({ companyName: "Reflex Reality LLP", taskNumberPrefix: "RR", allowEmployeeToAssignToEveryone: false, fileUploadLimitMb: 10, defaultReminderHours: 24, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  console.log(`Seed complete. Auth users ${withAuth ? "were created with a temporary password" : "were not created"}.`);
}

seed().catch((error) => { console.error(error); process.exitCode = 1; });
