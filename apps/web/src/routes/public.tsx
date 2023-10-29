import { AuthRoutes } from "@/features/auth";
import { authStore } from "@/features/auth/stores/auth";
import { NotFound } from "@/features/misc";
import { RouteObject, redirect } from "react-router-dom";

const isAuthenticated = authStore.getState().isAuthenticated;

async function loginLoader() {
  if (!isAuthenticated) {
    return null;
  }
  return redirect("/app");
}

export const publicRoutes: RouteObject[] = [
  {
    path: "/*",
    element: <AuthRoutes />,
    errorElement: <NotFound />,
    loader: loginLoader,
  },
];
