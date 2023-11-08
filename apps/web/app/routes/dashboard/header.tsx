import { Link } from "@remix-run/react";
import {
  GearIcon,
  MixerHorizontalIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MenubarShortcut } from "~/components/ui/menubar";

export function Header() {
  return (
    <nav className="flex h-16 items-center border-b border-b-zinc-200 px-6 shadow-sm">
      <div className="flex-auto">
        <Link to="/dashboard">
          <div className="flex items-center gap-2">
            <ChatBubbleIcon className="h-6 w-6 " />
            <span className="text-lg font-bold">needback</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" className="font-normal text-muted-foreground">
          Feedback
        </Button>
        <Button asChild variant="link">
          <Link to="/docs">Docs</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-7 w-7 rounded-full p-0"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://avatars.githubusercontent.com/u/41580619?v=4" />
                <AvatarFallback>SO</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-2 py-1.5">
              <p className="font-medium">Salih</p>
              <p className="text-muted-foreground">salihozdemir94@gmail.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Theme
              <MenubarShortcut>
                <MixerHorizontalIcon />
              </MenubarShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <MenubarShortcut>
                <GearIcon />
              </MenubarShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
