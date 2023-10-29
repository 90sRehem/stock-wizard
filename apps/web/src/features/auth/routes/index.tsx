import { Navigate, useRoutes } from "react-router-dom";
import { Layout, SignInForm, LoginForm } from "../components";

export function AuthRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <SignInForm />,
        },
        {
          path: "/login",
          element: <LoginForm />,
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
