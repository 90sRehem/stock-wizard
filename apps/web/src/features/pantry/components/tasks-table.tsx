import { Await, useLoaderData } from "react-router-dom";
import { TaskLoaderData, useTasks } from "../api";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";

export function TasksTable() {
  const initialData = useLoaderData() as TaskLoaderData;
  console.log(
    "🚀 ~ file: tasks-table.tsx:8 ~ TasksTable ~ initialData:",
    initialData,
  );
  const { data: tasks } = useTasks({
    config: {
      initialData,
    },
  });
  console.log("🚀 ~ file: tasks-table.tsx:9 ~ TasksTable ~ tasks:", tasks);

  return (
    <Suspense fallback={<DataTable.Skeleton />}>
      <Await
        resolve={tasks}
        errorElement={<div>Failed to load tasks</div>}
        children={(resolvedTasks) => (
          <DataTable data={resolvedTasks || []} columns={columns} />
        )}
      />
    </Suspense>
  );
}

TasksTable.Skeleton = DataTable.Skeleton;
