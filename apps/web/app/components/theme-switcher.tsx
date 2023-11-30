import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Select defaultValue="system" value={theme} onValueChange={setTheme}>
      <SelectTrigger className="h-6 w-[90px] px-1.5">
        <SelectValue role="menuitem" asChild>
          {
            {
              system: (
                <div className="flex items-center gap-1 text-xs">
                  <DesktopIcon  className="w-3 h-3"/>
                  System
                </div>
              ),
              dark: (
                <div className="flex items-center gap-1 text-xs">
                  <MoonIcon />
                  Dark
                </div>
              ),
              light: (
                <div className="flex items-center gap-1 text-xs">
                  <SunIcon />
                  Light
                </div>
              ),
            }[theme ?? "system"]
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="system">
          <div className="flex items-center gap-1 text-xs">
            <DesktopIcon />
            System
          </div>
        </SelectItem>
        <SelectItem value="dark">
          <div className="flex items-center gap-1 text-xs">
            <MoonIcon />
            Dark
          </div>
        </SelectItem>
        <SelectItem value="light">
          <div className="flex items-center gap-1 text-xs">
            <SunIcon />
            Light
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
