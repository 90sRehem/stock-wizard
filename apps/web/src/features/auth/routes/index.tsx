import {
  LoaderFunctionArgs,
  Navigate,
  RouteObject,
  redirect,
} from "react-router-dom";
import { Layout, SignInForm, LoginForm } from "../components";
import { login } from "../api/login";
import { toast } from "sonner";
import { z } from "zod";
import { authStore } from "../stores";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData.entries());

  const validateCredentials = loginSchema.safeParse(fields);

  if (!validateCredentials.success) {
    toast.error("Invalid credentials");
    return null;
  }

  try {
    await login(validateCredentials.data);
  } catch (error) {
    console.log("🚀 ~ file: index.tsx:36 ~ loginAction ~ error:", error);
    toast.error("Invalid credentials2");
    return null;
  }

  return redirect("/app");
}

export const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    loader: async () => {
      const isAuthenticated = authStore.getState().isAuthenticated;

      if (isAuthenticated) {
        return redirect("/app");
      }
      return null;
    },
    children: [
      {
        index: true,
        element: <SignInForm />,
      },
      {
        id: "login",
        path: "/login",
        action: loginAction,
        element: <LoginForm />,
      },
    ],
  },
  {
    path: "/logout",
    element: <Layout />,
    loader: async () => {
      const logout = authStore.getState().removeUser;
      logout();
      return redirect("/");
    },
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
];
