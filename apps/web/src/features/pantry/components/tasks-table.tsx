import { useTasks } from "../api";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function TasksTable() {
  const { data: tasks } = useTasks({
    config: {},
  });
  console.log("🚀 ~ file: tasks-table.tsx:9 ~ TasksTable ~ tasks:", tasks);

  return <DataTable data={tasks || []} columns={columns} />;
}

TasksTable.Skeleton = DataTable.Skeleton;
