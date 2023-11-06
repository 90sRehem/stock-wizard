import { api } from "@/lib/wretch";
import { Task, taskSchema } from "./taskSchema";
import { useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib";
import z from "zod";

const taskResponseSchema = z.array(taskSchema);

type TaskResponse = z.infer<typeof taskResponseSchema>;

export async function getTasks() {
  const response = await api.get("/tasks").res<Task[]>((res) => res.json());

  // the response is an array of tasks with crateAt and updatedAt as strings
  // we need to convert them to dates using zod.transform
  const tasks = taskResponseSchema.safeParse(response);
  if (!tasks.success) {
    throw new Error(tasks.error.message);
  }

  console.log("🚀 ~ file: getTasks.ts:15 ~ getTasks ~ tasks:", tasks);
  return tasks.data;
}

function getTasksConfig() {
  return {
    queryKey: ["tasks"],
    queryFn: getTasks,
  };
}

type UseTasksConfig = {
  config?: QueryConfig<typeof getTasks>;
};

export function useTasks({ config }: UseTasksConfig = {}) {
  return useQuery({
    ...getTasksConfig(),
    ...config,
  });
}
