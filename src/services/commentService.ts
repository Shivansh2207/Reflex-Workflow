import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Employee, TaskComment } from "@/types";

export function subscribeToComments(taskId: string, callback: (comments: TaskComment[]) => void) {
  return onSnapshot(query(collection(db, "tasks", taskId, "comments"), orderBy("createdAt", "asc")), (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as TaskComment));
  });
}
export function addComment(taskId: string, content: string, author: Employee) {
  return addDoc(collection(db, "tasks", taskId, "comments"), {
    taskId, content, authorId: author.uid, authorName: author.fullName, authorPhoto: author.profilePhotoUrl || "", mentions: [], attachments: [],
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(), isEdited: false, isDeleted: false
  });
}
