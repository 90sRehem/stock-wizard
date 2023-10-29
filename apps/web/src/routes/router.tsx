import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

const routes = [...publicRoutes, ...protectedRoutes];
export const router = createBrowserRouter(routes);
