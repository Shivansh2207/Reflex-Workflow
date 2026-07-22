"use client";

import { useQuery } from "@tanstack/react-query";
import { demoTasks } from "@/data/demo";
import { listMyTasks } from "@/services/taskService";
import { useAuth } from "@/providers/AuthProvider";

export function useTasks() {
  const { employee, demoMode } = useAuth();
  return useQuery({ queryKey: ["tasks", employee?.uid, demoMode], queryFn: () => demoMode ? demoTasks : listMyTasks(employee!), enabled: Boolean(employee), placeholderData: [] });
}
