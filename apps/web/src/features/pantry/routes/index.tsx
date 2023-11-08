import { Navigate, RouteObject } from "react-router-dom";
import { Pantry } from "./pantry";
import { AddTask } from "./add-task";
import { Layout } from "./layout";

export const pantryRoutes: RouteObject[] = [
  {
    path: "pantry",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Pantry />,
      },
      {
        path: "add-task",
        id: "add-task",
        element: <AddTask />,
      },
      {
        path: "update-task/:id",
        id: "update-task",
        element: <div>update task</div>,
      },
      {
        path: "remove-task/:id",
        id: "remove-task",
        element: <div>remove task</div>,
      },
    ],
  },
  {
    path: "pantry/*",
    element: <Navigate to="/" />,
  },
];
