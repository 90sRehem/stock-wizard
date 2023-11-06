import { MutationConfig, api } from "@/lib";
import { Task } from "./taskSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function addTask(task: Task): Promise<void> {
  return api.url("/tasks").post(task).res();
}

export async function addTaskWithResponse(task: Task): Promise<Task> {
  return api
    .url("/tasks")
    .post(task)
    .res<Task>((res) => res.json());
}

type UseAddTaskConfig = {
  config?: MutationConfig<typeof addTask>;
};

export function useAddTask({ config }: UseAddTaskConfig = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: addTask,
    onMutate: async (variables) => {
      queryClient.cancelQueries({ queryKey: ["tasks"] });
    },
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    ...config,
  });
}
