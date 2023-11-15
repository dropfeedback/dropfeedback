import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "@remix-run/react";
import {
  GearIcon,
  MixerHorizontalIcon,
  ChatBubbleIcon,
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
  SlashIcon,
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import { cn } from "~/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { fetchers } from "~/lib/fetchers";
import { useMe } from "~/data-hooks";
import { getNameInitials } from "~/utils";

const projects = [
  {
    value: "1",
    label: "Web app",
  },
  {
    value: "2",
    label: "Blog",
  },
  {
    value: "3",
    label: "E-commerce app",
  },
  {
    value: "4",
    label: "Portfolio",
  },
];

const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchers.logout,
    onSuccess: () => {
      navigate("/login");
    },
  });
};

export function DashboardHeader() {
  const params = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(params?.projectId || "");
  const [currentProject, setCurrentProject] = useState<{
    value: string;
    label: string;
  }>();

  const { data: user } = useMe();

  useEffect(() => {
    if (params?.projectId) {
      setValue(params.projectId);
    }
  }, [params?.projectId]);

  useEffect(() => {
    if (value) {
      const project = projects.find((project) => project.value === value);
      setCurrentProject(project);
    }
  }, [value]);

  const logout = () => {
    mutate();
  };

  return (
    <nav className="flex h-16 items-center border-b px-6 shadow-border">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <div className="flex items-center gap-2">
              <ChatBubbleIcon className="h-6 w-6 " />
              <span className="text-lg font-bold">needback</span>
            </div>
          </Link>

          {params?.projectId && (
            <SlashIcon className="h-4 w-4 text-primary opacity-20" />
          )}

          {params?.projectId && (
            <>
              <Link to={`/dashboard/${currentProject?.value}`}>
                {value ? currentProject?.label : "Select project..."}
              </Link>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="-ml-1.5 w-auto px-1"
                  >
                    <CaretSortIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-50 w-[200px] bg-background p-0">
                  <Command>
                    <CommandInput placeholder="Search project..." />
                    <CommandEmpty>No project found.</CommandEmpty>
                    <CommandGroup>
                      {projects.map((project) => (
                        <CommandItem
                          key={project.value}
                          value={project.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                            navigate(`/dashboard/${currentValue}`);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === project.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {project.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false);
                        }}
                      >
                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                        Create Project
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" className="font-normal text-muted-foreground">
          Feedback
        </Button>
        <Button
          asChild
          variant="link"
          className="font-normal text-muted-foreground hover:text-primary hover:no-underline"
        >
          <Link to="/docs">Docs</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-7 w-7 rounded-full p-0"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {getNameInitials(user?.name || user?.email)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-2 py-1.5">
              <p className="font-medium text-primary">{user?.name}</p>
              <p>{user?.email}</p>
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
            <DropdownMenuItem onClick={logout}>
              {isPending ? "Logging out.." : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
