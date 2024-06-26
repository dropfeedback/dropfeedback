import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  ChatBubbleIcon,
  ExitIcon,
  GearIcon,
  SlashIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenubarShortcut } from "@/components/ui/menubar";
import { useMe } from "@/data-hooks";
import { fetchers, removeAuthCookies } from "@/lib/fetchers";
import { getNameInitials } from "@/lib/utils";
import { ProjectSwitcher } from "./project-switcher";
import { ThemeSwitcher } from "./theme-switcher";

export function CommonHeader() {
  const params = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: fetchers.logout,
    onError: () => {
      removeAuthCookies();
      navigate("/login");
    },
    onSuccess: () => {
      removeAuthCookies();
      navigate("/login");
    },
  });

  const { data: user } = useMe();

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="z-50 flex h-16 items-center border-b px-4 md:px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center gap-2">
          <Link to="/projects">
            <div className="flex items-center gap-2">
              <ChatBubbleIcon className="h-5 w-5" />
              <span className="hidden text-lg font-bold tracking-tight sm:block">
                DropFeedback
              </span>
            </div>
          </Link>

          {params?.projectId && (
            <>
              <SlashIcon className="h-4 w-4 text-primary opacity-20" />
              <ProjectSwitcher />
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          className="hidden font-normal text-muted-foreground sm:block"
        >
          Feedback
        </Button>
        <Button
          asChild
          variant="link"
          className="font-normal text-muted-foreground hover:text-primary hover:no-underline"
        >
          <a
            href="https://www.dropfeedback.com"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </Button>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-7 w-7 rounded-full p-0"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.avatarUrl} alt={`${user?.fullName}`} />
                <AvatarFallback>
                  {getNameInitials(`${user?.fullName}`)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[220px]">
            <div className="px-2 py-1.5">
              <p className="font-medium text-primary">{`${user?.fullName}`}</p>
              <p>{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <div className="flex justify-between px-2 py-1.5 transition-colors hover:text-accent-foreground">
              Theme
              <ThemeSwitcher />
            </div>
            <DropdownMenuItem asChild>
              <Link to="/settings">
                Settings
                <MenubarShortcut>
                  <GearIcon />
                </MenubarShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="text-red focus:bg-red-foreground focus:text-red"
            >
              {logoutMutation.isPending ? "Logging out.." : "Log out"}
              <MenubarShortcut>
                <ExitIcon />
              </MenubarShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
