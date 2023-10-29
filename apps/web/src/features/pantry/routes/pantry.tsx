import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useTasks } from "../api";
import { Suspense } from "react";
import { TasksTable } from "../components/tasks-table";

export function Pantry() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      <Suspense fallback={<TasksTable.Skeleton />}>
        <TasksTable />
      </Suspense>
    </div>
  );
}
