import { api } from "@/lib/wretch";
import { Task } from "./taskSchema";
import { useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib";

export async function getTasks(): Promise<Task[]> {
  const response = api<Task[]>().get("/tasks");
  return response;
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
