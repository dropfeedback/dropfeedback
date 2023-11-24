import { type ReactNode } from "react";
import {
  DesktopIcon,
  FileIcon,
  GlobeIcon,
  PersonIcon,
  SizeIcon,
} from "@radix-ui/react-icons";
import { cn, getRelativeTime } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { type Feedback } from "~/types";
import UAParser from "ua-parser-js";

export function FeedbackCard({
  id,
  content,
  createdAt,
  category,
  device,
  origin,
  openedCardId,
  setOpenedCardId,
}: Feedback & {
  category: string;
  openedCardId?: string;
  setOpenedCardId: (id: string) => void;
}) {
  const isOpen = openedCardId === id;
  const uaParser = new UAParser(device);
  const ua = uaParser.getResult();

  return (
    <button
      aria-label="Open feedback card to see more details"
      className={cn(
        "block w-full select-text border-b p-2 text-left transition-all last:border-none",
        {
          "my-4 cursor-auto rounded-md border-x border-t bg-accent/50": isOpen,
        },
      )}
      onClick={() => setOpenedCardId(id)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div
            className={cn(
              "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold select-none",
              {
                "border-orange-500 bg-orange-50 text-orange-500":
                  category === "Idea",
                "border-red-500 bg-red-50 text-red-500": category === "Issue",
                "border-slate-500 bg-slate-50 text-slate-500":
                  category === "Other",
              },
            )}
          >
            {category}
          </div>
          <div className="text-xs text-muted-foreground">
            {getRelativeTime(createdAt)}
          </div>
        </div>
        <p
          className={cn("line-clamp-5 text-base", {
            "line-clamp-none": isOpen,
          })}
        >
          {content}
        </p>
        {isOpen && (
          <>
            <div className="grid grid-cols-2 gap-y-2">
              <div className="inline-flex items-center gap-2">
                <SessionIcon tooltipDescription="Reporter">
                  <PersonIcon className="text-muted-foreground" />
                </SessionIcon>
                <span>someone@example.com</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <SessionIcon tooltipDescription="Page">
                  <FileIcon className="text-muted-foreground" />
                </SessionIcon>
                <span>{origin}</span>
              </div>
              {ua.os.name && ua.os.version && (
                <div className="inline-flex items-center gap-2">
                  <SessionIcon tooltipDescription="System">
                    <DesktopIcon className="text-muted-foreground" />
                  </SessionIcon>
                  <span>{`${ua.os.name} ${ua.os.version}`}</span>
                </div>
              )}
              {ua.browser.name && ua.browser.version && (
                <div className="inline-flex items-center gap-2">
                  <SessionIcon tooltipDescription="Browser">
                    <GlobeIcon className="text-muted-foreground" />
                  </SessionIcon>
                  <span>{`${ua.browser.name} ${ua.browser.version}`}</span>
                </div>
              )}
              <div className="inline-flex items-center gap-2">
                <SessionIcon tooltipDescription="Screen Size">
                  <SizeIcon className="text-muted-foreground" />
                </SessionIcon>
                <span>1240 x 720</span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm" variant="outline">
                Archive
              </Button>
            </div>
          </>
        )}
      </div>
    </button>
  );
}

const SessionIcon = (props: {
  children: ReactNode;
  tooltipDescription: string;
}) => (
  <TooltipProvider>
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>{props.children}</TooltipTrigger>
      <TooltipContent sideOffset={5}>{props.tooltipDescription}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
