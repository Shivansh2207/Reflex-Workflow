importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBbc4K49bS2qB1qbdhAp6ZBDB9xwYTY7uM",
  authDomain: "reflex-task-ef13d.firebaseapp.com",
  projectId: "reflex-task-ef13d",
  storageBucket: "reflex-task-ef13d.firebasestorage.app",
  messagingSenderId: "275907311137",
  appId: "1:275907311137:web:77287e57b882c384345560"
});

firebase.messaging().onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  self.registration.showNotification(notification.title || "Reflex Workspace", {
    body: notification.body || "You have a new workspace update.",
    icon: "/icons/icon.svg",
    badge: "/icons/icon.svg",
    data: payload.data
  });
});
