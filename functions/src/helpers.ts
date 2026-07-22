import { getFirestore } from "firebase-admin/firestore";
import { HttpsError } from "firebase-functions/v2/https";
export const db = getFirestore();
export async function requireRole(uid: string | undefined, roles: string[]){if(!uid)throw new HttpsError("unauthenticated","Sign in is required.");const snap=await db.doc(`employees/${uid}`).get();const user=snap.data();if(!user||user.accountStatus!=="active")throw new HttpsError("permission-denied","An active employee account is required.");if(!roles.includes(user.role))throw new HttpsError("permission-denied","Your role cannot perform this action.");return user;}
export function audit(actorId:string,actorName:string,action:string,entityType:string,entityId:string,oldValue?:unknown,newValue?:unknown){return db.collection("auditLogs").add({actorId,actorName,action,entityType,entityId,oldValue:oldValue??null,newValue:newValue??null,createdAt:new Date()});}
