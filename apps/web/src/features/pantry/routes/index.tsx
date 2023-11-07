import { Navigate, RouteObject } from "react-router-dom";
import { Pantry } from "./pantry";
import { Suspense } from "react";
import { AddTask, addTaskAction } from "./add-task";
import { Layout } from "./layout";

export const pantryRoutes: RouteObject[] = [
  {
    path: "pantry",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Pantry...</div>}>
            <Pantry />
          </Suspense>
        ),
      },
      {
        path: "add-task",
        id: "add-task",
        action: addTaskAction,
        element: (
          <Suspense fallback={<div>Loading Add Task...</div>}>
            <AddTask />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "pantry/*",
    element: <Navigate to="/" />,
  },
];
