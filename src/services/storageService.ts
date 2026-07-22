import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";

const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "image/png", "image/jpeg", "image/webp", "text/plain", "application/zip"];

export function validateAttachment(file: File, maxMb = 10) {
  if (file.size > maxMb * 1024 * 1024) throw new Error(`File must be smaller than ${maxMb} MB.`);
  if (!allowed.includes(file.type)) throw new Error("This file type is not supported.");
}
export function uploadTaskAttachment(taskId: string, attachmentId: string, file: File, onProgress: (progress: number) => void) {
  validateAttachment(file);
  const upload = uploadBytesResumable(ref(storage, `tasks/${taskId}/attachments/${attachmentId}/${file.name}`), file, { contentType: file.type });
  upload.on("state_changed", (snapshot) => onProgress(snapshot.bytesTransferred / snapshot.totalBytes * 100));
  return { upload, result: new Promise<string>((resolve, reject) => upload.on("state_changed", undefined, reject, async () => resolve(await getDownloadURL(upload.snapshot.ref)))) };
}
