import { describe, expect, it } from "vitest";
import { taskSchema } from "./validators";
const valid = { title: "Prepare site report", description: "Compile the weekly property site report.", assigneeId: "employee-1", priority: "Medium", dueDate: "2026-08-20", requiresApproval: false };
describe("task validation", () => {
  it("accepts a complete task", () => expect(taskSchema.safeParse(valid).success).toBe(true));
  it("rejects an empty title", () => expect(taskSchema.safeParse({ ...valid, title: "" }).success).toBe(false));
  it("rejects a missing assignee", () => expect(taskSchema.safeParse({ ...valid, assigneeId: "" }).success).toBe(false));
  it("rejects a due date before the start date", () => expect(taskSchema.safeParse({ ...valid, startDate: "2026-09-01" }).success).toBe(false));
});
