import { Outlet } from "react-router-dom";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<NonNullable<unknown>>;

export function Layout(_props: LayoutProps) {
  return (
    <main className="w-screen h-screen">
      <Outlet />
    </main>
  );
}
