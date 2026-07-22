import { collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Employee } from "@/types";

export async function getEmployee(uid: string) {
  const snapshot = await getDoc(doc(db, "employees", uid));
  return snapshot.exists() ? ({ uid: snapshot.id, ...snapshot.data() } as Employee) : null;
}

export async function listEmployees(departmentId?: string) {
  const filters = departmentId ? [where("departmentId", "==", departmentId)] : [];
  const snapshot = await getDocs(query(collection(db, "employees"), ...filters, where("accountStatus", "==", "active"), orderBy("fullName"), limit(100)));
  return snapshot.docs.map((item) => ({ uid: item.id, ...item.data() } as Employee));
}

export function updateOwnProfile(uid: string, changes: Pick<Partial<Employee>, "phone" | "bio" | "skills" | "availabilityStatus" | "profilePhotoUrl">) {
  return updateDoc(doc(db, "employees", uid), { ...changes, updatedAt: new Date().toISOString() });
}
