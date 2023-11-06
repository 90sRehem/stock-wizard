import { authRoutes } from "@/features/auth";
import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [...authRoutes];
