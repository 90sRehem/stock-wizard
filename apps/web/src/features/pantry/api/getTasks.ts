import { api } from "@/lib/wretch";
import { Task, taskSchema } from "./taskSchema";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib";
import z from "zod";
import { LoaderFunctionArgs, defer } from "react-router-dom";

const taskResponseSchema = z.array(taskSchema);

export type TaskResponse = z.infer<typeof taskResponseSchema>;

export async function getTasks(): Promise<TaskResponse> {
  try {
    const response = await api.get("/tasks").res<Task[]>((res) => res.json());
    const tasks = taskResponseSchema.safeParse(response);
    if (!tasks.success) {
      throw new Error(tasks.error.message);
    }

    return tasks.data;
  } catch (error) {
    console.log("🚀 ~ file: getTasks.ts:26 ~ getTasks ~ error:", error);
    return [];
  }
}

function getTasksQuery() {
  return {
    queryKey: ["tasks"],
    queryFn: getTasks,
  };
}

export function tasksLoader(queryClient: QueryClient) {
  return async (_config: Partial<LoaderFunctionArgs>) => {
    const tasksQuery = getTasksQuery();
    const queryData = queryClient.getQueryData<TaskResponse>(
      tasksQuery.queryKey,
    );

    if (queryData) {
      console.log("🚀 ~ file: getTasks.ts:42 ~ return ~ queryData:", queryData);
      return queryData;
    } else {
      const tasks = (await tasksQuery.queryFn()) as TaskResponse;
      console.log("🚀 ~ file: getTasks.ts:46 ~ return ~ tasks:", tasks);
      return defer({ tasks });
      // return tasks;
    }
  };
}

export type TaskLoaderData = Awaited<
  ReturnType<ReturnType<typeof tasksLoader>>
>;

type UseTasksConfig = {
  config?: QueryConfig<typeof getTasks>;
};

export function useTasks({ config }: UseTasksConfig = {}) {
  return useQuery({
    ...getTasksQuery(),
    ...config,
  });
}
