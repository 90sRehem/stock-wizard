import { useAuth } from "@/features/auth";
import { Menu } from "./menu";
import { NotificationsMenu } from "./notifications-menu";
import { Icons } from "ui";

export function Header() {
  const username = useAuth((state) => state.user?.name);
  const email = useAuth((state) => state.user?.email);
  const logout = useAuth((state) => state.logout);

  return (
    <header className="flex gap-2 h-16 items-center space-x-4 p-5 bg-gray-800  text-white shadow-2xl">
      <div className="inline-flex gap-4 items-center justify-start">
        <Icons.Warehouse className="w-10 h-10" />
        <h1 className={`text-white origin-left font-medium text-2xl`}>
          StockWizard
        </h1>
      </div>
      <div className="flex items-center justify-end gap-4 w-full">
        <NotificationsMenu />
        <Menu email={email ?? ""} username={username ?? ""} logout={logout} />
      </div>
    </header>
  );
}
