import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <article>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </article>
  );
}
