import { Landing, NotFound } from "@/features/misc";
import { RouteObject } from "react-router-dom";

export const commonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
];
