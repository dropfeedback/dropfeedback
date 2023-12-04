import { type ReactNode } from "react";
import {
  DesktopIcon,
  FileIcon,
  GlobeIcon,
  PersonIcon,
  SizeIcon,
} from "@radix-ui/react-icons";
import UAParser from "ua-parser-js";
import { motion } from "framer-motion";
import { cn, getRelativeTime } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { FeedbackCategory, type Feedback } from "~/types";

export function FeedbackCard({
  id,
  content,
  createdAt,
  device,
  origin,
  category,
  openedCardId,
  setOpenedCardId,
}: Feedback & {
  openedCardId?: string;
  setOpenedCardId: (id: string) => void;
}) {
  const isOpen = openedCardId === id;
  const uaParser = new UAParser(device);
  const ua = uaParser.getResult();

  return (
    <motion.button
      aria-label="Open feedback card to see more details"
      whileInView={{ opacity: 1, transition: { duration: 0.15 } }}
      className={cn(
        "block w-full select-text border-b p-2 text-left opacity-0 transition-all last:border-none",
        {
          "cursor-auto bg-accent/70": isOpen,
        },
      )}
      onClick={() => setOpenedCardId(id)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            {getRelativeTime(createdAt)}
          </div>
          <div
            className={cn(
              "inline-flex select-none items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold",
              {
                "border-amber bg-amber-foreground text-amber":
                  category === FeedbackCategory.idea,
                "border-red bg-red-foreground text-red":
                  category === FeedbackCategory.issue,
                "border-gray bg-gray-foreground text-gray":
                  category === FeedbackCategory.other,
              },
            )}
          >
            {category}
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
            <div className="border-b-2 border-dashed" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
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
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline">
                Archive
              </Button>
              <Button size="sm">Reply</Button>
            </div>
          </>
        )}
      </div>
    </motion.button>
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
