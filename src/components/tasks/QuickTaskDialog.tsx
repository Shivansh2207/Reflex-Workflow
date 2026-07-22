"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { CalendarDays, ChevronRight, Mic2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { VoiceInputButton } from "@/components/voice/VoiceInputButton";
import { demoEmployees } from "@/data/demo";
import { useAuth } from "@/providers/AuthProvider";
import { createTask } from "@/services/taskService";

export function QuickTaskDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false); const [title, setTitle] = useState(""); const [assigneeId, setAssigneeId] = useState(""); const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium"); const [dueDate, setDueDate] = useState(""); const [saving, setSaving] = useState(false);
  const { employee, demoMode } = useAuth(); const router = useRouter();
  const append = (text: string) => setTitle((current) => `${current}${current ? " " : ""}${text}`);
  async function submit(draft = false) {
    if (!title.trim() || !assigneeId || !dueDate || !employee) { toast.error("Add a title, assignee, and due date."); return; }
    setSaving(true);
    try {
      if (!demoMode) await createTask({ title, description: title, assigneeId, priority, dueDate, requiresApproval: false }, employee, demoEmployees.find((item) => item.uid === assigneeId));
      toast.success(draft ? "Draft saved" : "Task created", { description: demoMode ? "Demo mode keeps this preview local." : "The assignee will be notified." });
      setOpen(false); setTitle(""); setAssigneeId(""); setDueDate("");
    } catch { toast.error("Task could not be created. Please try again."); } finally { setSaving(false); }
  }
  return <Dialog.Root open={open} onOpenChange={(next) => { if (!next && title && !confirm("Discard your unsaved task?")) return; setOpen(next); }}>
    <Dialog.Trigger asChild><Button className={triggerClassName}><Plus className="size-4" />Create task</Button></Dialog.Trigger>
    <Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-[#071016]/65 backdrop-blur-sm" /><Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[22px] border bg-[var(--surface)] p-0 shadow-2xl">
      <div className="flex items-center justify-between border-b px-6 py-5"><div><Dialog.Title className="text-lg font-extrabold tracking-tight">Create a quick task</Dialog.Title><Dialog.Description className="mt-1 text-xs text-[var(--muted)]">Capture the essentials now. Add detail later.</Dialog.Description></div><Dialog.Close asChild><button className="flex size-9 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-2)]" aria-label="Close"><X className="size-5" /></button></Dialog.Close></div>
      <div className="space-y-5 p-6"><div><label className="label" htmlFor="quick-title">What needs to be done?</label><div className="relative"><textarea id="quick-title" className="control min-h-28 resize-none pr-14 text-base" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Describe the task clearly…" autoFocus /><div className="absolute bottom-2 right-2"><VoiceInputButton onTranscript={append} compact /></div></div><div className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--muted)]"><Mic2 className="size-3" />Voice input appends to your existing text.</div></div>
        <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="quick-assignee">Assignee</label><select id="quick-assignee" className="control" value={assigneeId} onChange={(event) => setAssigneeId(event.target.value)}><option value="">Select a teammate</option>{demoEmployees.map((item) => <option key={item.uid} value={item.uid}>{item.fullName} · {item.departmentName}</option>)}</select></div><div><label className="label" htmlFor="quick-priority">Priority</label><select id="quick-priority" className="control" value={priority} onChange={(event) => setPriority(event.target.value as typeof priority)}><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></div></div>
        <div><label className="label" htmlFor="quick-due">Due date</label><div className="relative"><CalendarDays className="pointer-events-none absolute left-3 top-3.5 size-4 text-[var(--muted)]" /><input id="quick-due" type="date" className="control pl-10" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></div></div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-[var(--surface-2)] px-6 py-4"><Button variant="ghost" onClick={() => { setOpen(false); router.push("/tasks/new"); }}>Open full form <ChevronRight className="size-4" /></Button><div className="flex gap-2"><Button variant="secondary" onClick={() => submit(true)} disabled={saving}>Save draft</Button><Button onClick={() => submit(false)} loading={saving}>Create task</Button></div></div>
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root>;
}
