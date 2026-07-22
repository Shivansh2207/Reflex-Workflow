# Reflex Workspace

Reflex Workspace is an internal, installable work-coordination application for Reflex Reality LLP. It focuses on employee profiles, task assignment, task discussion, approvals, workload visibility, notifications, attachments, and practical voice-to-text entry.

The application is built with Next.js App Router, strict TypeScript, React, Tailwind CSS, Radix primitives, Firebase, TanStack Query, React Hook Form, Zod, Recharts, Vitest, and Firebase Cloud Functions.

## What is implemented

- Firebase email/password authentication, persistent sessions, password reset, inactive-account blocking, and protected client routes
- Role-aware navigation and permissions for admins, managers, and employees
- Employee directory, filtering, profiles, availability, skills, and quick task assignment
- Firebase-backed task create/read/update services, searchable list, Kanban, calendar, and My Day views
- Task detail view, guarded status transitions, approval rules, checklist progress, attachments, comments, and activity history
- Quick task dialog and complete task form with validation and unsaved-change protection
- Browser-native voice typing for titles, descriptions, and comments in English (India/US), Hindi, and Marathi
- Personalized manager/employee dashboard, workload charts, reports, announcements, notifications, projects, departments, approvals, settings, and admin views
- Light, dark, and system themes based on the supplied Reflex Reality brand asset
- Installable PWA manifest, offline shell, recently viewed task cache, Firebase Messaging service worker, and app shortcuts
- Firestore and Storage rules, composite indexes, protected Cloud Functions, scheduled reminders, audit records, and a development seed script
- Loading, offline, empty, not-found, and global error states

## Project structure

```text
src/app/                 Next.js routes and route groups
src/components/          Layout, task, employee, voice, dashboard, shared, and UI components
src/hooks/               Speech recognition, tasks, and online state hooks
src/lib/                 Firebase clients, messaging, validation, permissions, and constants
src/providers/           Authentication, theme, and TanStack Query providers
src/services/            Firebase Auth, Firestore, Storage, task, employee, and comment services
src/types/               Shared domain interfaces
functions/src/           Trusted Cloud Functions and scheduled jobs
firebase/                Firestore rules, Storage rules, and indexes
scripts/seed.ts          Opt-in development seed data
public/                  PWA, service worker, icons, and supplied logo
```

## Local setup

Requirements: Node.js 22 or newer, npm, a Firebase project, and the Firebase CLI.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The supplied Firebase client configuration is used as a safe fallback, so the app can connect immediately. Client config identifies a Firebase project; it does not grant database access. Authentication and the checked-in Security Rules enforce access.

To review the interface without a Firebase user, set `NEXT_PUBLIC_DEMO_MODE=true` only in `.env.local`. Demo mode is intentionally explicit and should never be enabled in production.

## Firebase setup

1. Install and authenticate the Firebase CLI:

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add
   ```

2. In Firebase Console, enable Email/Password under Authentication > Sign-in method. Do not enable public registration in the UI.
3. Create a Cloud Firestore database in production mode and a default Cloud Storage bucket.
4. Create a Web Push certificate under Project Settings > Cloud Messaging and add its public key to `NEXT_PUBLIC_FIREBASE_VAPID_KEY`.
5. Install and build Cloud Functions:

   ```bash
   cd functions
   npm install
   npm run build
   cd ..
   ```

6. Deploy infrastructure:

   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only firestore:indexes
   firebase deploy --only storage
   firebase deploy --only functions
   # or deploy all configured Firebase resources
   firebase deploy
   ```

Cloud Functions require a billing-enabled Firebase project for production deployment. Invitation links are generated securely by Admin Auth; connect your transactional email provider inside `createEmployeeInvitation` before sending them automatically.

## Development data

The seed script never runs automatically. It uses Application Default Credentials and will write to the selected project, so confirm the project before running it.

```bash
gcloud auth application-default login
$env:GCLOUD_PROJECT="reflex-task-ef13d"
npm run seed
```

`npm run seed -- --with-auth` also creates Auth users with the temporary password `ChangeMe!2026`. Change those passwords immediately and use only in an emulator or dedicated development project.

For local emulators:

```bash
firebase emulators:start
```

The configured ports are Auth 9099, Functions 5001, Firestore 8080, Storage 9199, and Emulator UI 4000. Point the client SDK to emulators in a local-only branch or adapter before testing writes; never ship emulator connections.

## Firestore model

The primary collections are `employees`, `departments`, `projects`, `tasks`, `notifications`, `announcements`, `organizationSettings`, `taskCounters`, `invitations`, and `auditLogs`. Comments and activities are subcollections under each task because they are naturally scoped and can be subscribed to only while a task is open:

```text
tasks/{taskId}/comments/{commentId}
tasks/{taskId}/activities/{activityId}
```

Task creation from the application calls the protected `createTaskWithNumber` function. It generates the next task number in a Firestore transaction, validates the assignee and department assignment policy, and writes the task atomically.

## Security notes

- Firestore starts closed: unmatched documents are denied.
- Inactive and suspended accounts fail the active-user check.
- Employees can edit only phone, photo, bio, skills, availability, and notification preferences on their own profile.
- Roles, account status, task counters, invitations, audit logs, and system notifications are protected from normal client writes.
- Task access is based on creator, assignee, watcher, department manager, or admin membership.
- Protected task fields (`taskNumber`, `createdAt`, `createdById`, `createdByName`) cannot be changed by clients.
- Storage validates authentication, task membership, MIME type, file ownership paths, and the 10 MB default limit.
- Admin SDK credentials and service-account keys must never be placed in `.env.local`, client code, or the repository.
- Client-side route protection improves UX; Security Rules and callable functions are the actual authorization boundary.
- Storage Rules read Firestore task membership for authorization. At very high attachment volume, controlled upload/download URLs from Cloud Functions can reduce rule lookups and support malware-scanning workflows.

Before production, enable App Check, configure password policy/MFA if required, add rate limits at the callable-function layer, connect transactional email, configure log retention, and test every role with the Emulator Suite.

## Voice input compatibility

Voice input uses `window.SpeechRecognition` or `window.webkitSpeechRecognition`. Chromium-based browsers currently provide the broadest support. Firefox and some iOS browser versions may not expose the API. Recognition can depend on the browser vendor's network service and should not be treated as perfectly accurate. The UI always leaves the transcript editable and never auto-submits it. Users should review names, dates, and technical terms.

Microphone access must be allowed by the browser and the app must be served from HTTPS (localhost is accepted during development). Typing remains available when the API, microphone, permission, or network is unavailable.

## PWA and notifications

The manifest and `sw.js` create an installable offline application shell. Recently viewed `/tasks/*` pages use a network-first cache. Firebase Messaging uses the separate `firebase-messaging-sw.js` worker. Add the VAPID key and request permission from Settings; browsers may block prompts that are not triggered by a user gesture.

Service workers are registered only in production builds to prevent stale bundles during local development.

## Validation commands

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Cloud Functions are checked separately:

```bash
cd functions
npm install
npm run build
```

## Vercel deployment

1. Import the repository into Vercel.
2. Add the values from `.env.example` as project environment variables. Keep `NEXT_PUBLIC_DEMO_MODE=false`.
3. Use the default Next.js build command (`npm run build`) and output settings.
4. Deploy Firebase rules, indexes, Storage rules, and Functions separately with Firebase CLI.
5. Add the Vercel production domain to Firebase Authentication > Authorized domains.
6. Verify login, Storage CORS, push permission, PWA installability, and task queries on the production domain.

## Troubleshooting

- **The email or password is incorrect:** confirm the Auth user exists and Email/Password is enabled.
- **The user signs in but returns to login:** create `employees/{uid}` with `accountStatus: "active"`.
- **Permission denied:** deploy the checked-in rules and confirm the employee role/department fields.
- **A query requests an index:** deploy `firebase/firestore.indexes.json` and wait for index construction.
- **Voice button does not listen:** use HTTPS/localhost, check microphone permission, and try a Chromium browser.
- **Push does not arrive:** configure VAPID, verify notification permission, save a device token, and deploy Functions.
- **PWA content looks stale:** unregister the service worker or clear site data after changing cache versions.
- **Storage upload fails:** check MIME type, the 10 MB limit, task membership, and the exact folder path.

Reflex Workspace intentionally excludes payroll, attendance, surveillance, CRM, public registration, and employee scoring. It is an operational coordination tool; task counts are not employee-performance measures.
