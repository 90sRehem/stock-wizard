import { api } from "@/lib";
import { Task } from "./taskSchema";

export async function addTask(task: Task): Promise<void> {
  return api<void>().url("/api/tasks").post(task).
}

