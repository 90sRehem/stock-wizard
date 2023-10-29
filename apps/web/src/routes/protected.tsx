import { authStore } from "@/features/auth";
import { Dashboard, RouteLayout } from "@/features/misc";
import { Profile } from "@/features/misc/routes/profile";
import { Settings } from "@/features/misc/routes/settings";
import { PantryRoutes } from "@/features/pantry/routes";
import { Navigate, redirect } from "react-router-dom";

const isAuthenticated = authStore.getState().isAuthenticated;

export const protectedRoutes = [
  {
    path: "/app",
    element: <RouteLayout />,
    loader() {
      if (!isAuthenticated) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
      { path: "pantry/*", element: <PantryRoutes /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
