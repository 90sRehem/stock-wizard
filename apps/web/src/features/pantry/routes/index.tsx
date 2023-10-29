import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { Pantry } from "./pantry";
import { Suspense } from "react";

function Layout() {
  return (
    <article>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </article>
  );
}

export function PantryRoutes() {
  const routes = useRoutes([
    {
      path: "/",
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
      ],
    },
    {
      path: "/*",
      element: <Navigate to="/" />,
    },
  ]);

  return routes;
}
