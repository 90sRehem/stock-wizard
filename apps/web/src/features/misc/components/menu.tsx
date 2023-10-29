import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "ui";

type MenuProps = {
  username: string;
  email: string;
  logout: () => void;
};

function getAvatarFallback(name: string | null) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toLocaleUpperCase();
}

export function Menu({ email, logout, username }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-12 bg-transparent hover:bg-zinc-400">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback className="text-zinc-500">
                {" "}
                {getAvatarFallback(username!)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none text-zinc-600">
                {username}
              </p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="profile">Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="settings">Ajustes</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
