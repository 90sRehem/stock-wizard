import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
} from "ui";

export function NotificationsMenu() {
  const hasNotifications = true;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="bg-transparent relative"
          variant="default"
        >
          <Icons.Bell className="h-6 w-6 text-black" />
          {hasNotifications && (
            <span className="absolute top-0 bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem>notification 1</DropdownMenuItem>
          <DropdownMenuItem>notification 2</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
