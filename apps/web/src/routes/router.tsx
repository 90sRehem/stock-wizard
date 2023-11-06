import { createBrowserRouter, redirect } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { authStore } from "@/features/auth";
import { Layout } from "@/features/auth/components";

const routes = [...publicRoutes, ...protectedRoutes];

async function loginLoader() {
  const isAuthenticated = authStore.getState().isAuthenticated;
  if (isAuthenticated) {
    redirect("/");
  }
  return null;
}

export const router = createBrowserRouter([
  {
    id: "app",
    path: "/",
    children: routes,
    element: <Layout />,
    loader: loginLoader,
  },
]);
