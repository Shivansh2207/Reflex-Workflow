import { describe, expect, it } from "vitest";
import { canApproveTask, canViewTask, isValidTransition } from "./permissions";
import { demoEmployee, demoTasks } from "@/data/demo";

describe("task permissions", () => {
  it("allows a manager to view a department task", () => expect(canViewTask(demoEmployee, demoTasks[0])).toBe(true));
  it("allows a reviewer workflow to complete after submission", () => expect(isValidTransition("Submitted for Review", "Completed", true)).toBe(true));
  it("blocks direct completion when approval is required", () => expect(isValidTransition("In Progress", "Completed", true)).toBe(false));
  it("blocks invalid workflow jumps", () => expect(isValidTransition("Assigned", "Completed")).toBe(false));
  it("lets a department manager approve department work", () => expect(canApproveTask(demoEmployee, demoTasks[1])).toBe(true));
});
