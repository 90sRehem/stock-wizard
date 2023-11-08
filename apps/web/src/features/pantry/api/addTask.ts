import { MutationConfig, api } from "@/lib";
import { Task } from "./taskSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddTaskParams = Pick<Task, "label" | "priority" | "status" | "title">;

async function addTask(task: Task): Promise<Task> {
  const data: Task = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: null,
  };
  return api
    .url("/tasks")
    .post(data)
    .res<Task>((res) => res.json());
}

type UseAddTaskConfig = {
  config?: MutationConfig<typeof addTask>;
};

function addTaskMutation() {
  return {
    mutationKey: ["tasks"],
    mutationFn: addTask,
  };
}

export function useAddTask({ config }: UseAddTaskConfig = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    ...addTaskMutation(),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || [];

      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks) =>
        oldTasks
          ? [
            ...oldTasks,
            {
              ...variables,
            },
          ]
          : [],
      );

      return { previousTasks } as const;
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(["tasks"], context.previousTasks);
      }
    },
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    ...config,
  });
}
