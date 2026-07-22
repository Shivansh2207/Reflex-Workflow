import { getMessaging, getToken, isSupported, onMessage, type MessagePayload } from "firebase/messaging";
import { app } from "./firebase";

export async function requestPushToken() {
  if (typeof window === "undefined" || !(await isSupported())) return null;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;
  const registration = await navigator.serviceWorker.ready;
  return getToken(getMessaging(app), { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, serviceWorkerRegistration: registration });
}

export async function listenForForegroundMessages(callback: (payload: MessagePayload) => void) {
  if (typeof window === "undefined" || !(await isSupported())) return () => undefined;
  return onMessage(getMessaging(app), callback);
}
