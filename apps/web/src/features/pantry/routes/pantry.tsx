import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useTasks } from "../api";
import { Suspense } from "react";
import { TasksTable } from "../components/tasks-table";
import { useAddTask } from "../api/addTask";
import { Button, Dialog, Input, Label } from "ui";
import { Link, Outlet } from "react-router-dom";

export function Pantry() {
  const addTaskMutation = useAddTask();

  const handleAddTask = async () => {
    console.log("clicked");
    try {
      await addTaskMutation.mutateAsync({
        id: crypto.randomUUID(),
        label: "bug",
        priority: "high",
        status: "backlog",
        title: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.log("🚀 ~ file: pantry.tsx:16 ~ handleAddTask ~ error:", error);
    }
  };

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <Button asChild>
            <Link to="add-task">Add Task</Link>
          </Button>
        </div>
        <Suspense fallback={<TasksTable.Skeleton />}>
          <TasksTable />
        </Suspense>
        <Outlet />
      </div>
    </>
  );
}
