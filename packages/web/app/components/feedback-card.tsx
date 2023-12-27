import {
  DesktopIcon,
  FileIcon,
  GlobeIcon,
  PersonIcon,
  SizeIcon,
} from "@radix-ui/react-icons";
import UAParser from "ua-parser-js";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@remix-run/react";
import { cn, getRelativeTime } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { fetchers } from "~/lib/fetchers";
import { useFeedbackContext } from "./feedback-provider";
import { FeedbackCategory, type Feedback, FeedbackStatus } from "~/types";
import { type ApiError } from "~/lib/axios";

type UpdateFeedbackStatusVariables = {
  id: string;
  projectId: string;
  status: FeedbackStatus;
};

export function FeedbackCard({
  id,
  content,
  createdAt,
  device,
  url,
  category,
  openedCardId,
  status,
  meta,
  reportIdentifier,
  resolution,
  setOpenedCardId,
}: Feedback & {
  openedCardId?: string;
  setOpenedCardId: (id: string) => void;
}) {
  const queryClient = useQueryClient();
  const { projectId, filtersAndSorters } = useFeedbackContext();

  const isOpen = openedCardId === id;
  const uaParser = new UAParser(device);
  const ua = uaParser.getResult();

  const updateFeedbackStatus = useMutation<
    Feedback,
    ApiError,
    UpdateFeedbackStatusVariables
  >({
    mutationFn: (variables) => fetchers.updateFeedbackStatus(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", projectId, { ...filtersAndSorters }],
      });
    },
  });

  return (
    <motion.button
      aria-label="Open feedback card to see more details"
      whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
      className={cn(
        "block w-full cursor-pointer select-text overflow-hidden border-b p-2 text-left opacity-0 transition-all last:border-none",
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
            <div className="border-t">
              <h3 className="my-2 font-medium">Session</h3>
              <div className="grid grid-cols-1 gap-x-1 gap-y-2 md:grid-cols-2">
                {reportIdentifier && (
                  <div className="flex gap-2">
                    <SessionIcon tooltipDescription="Reporter">
                      <div className="flex h-5 items-center">
                        <PersonIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </SessionIcon>
                    <p className="break-all">{reportIdentifier}</p>
                  </div>
                )}
                {url && (
                  <div className="flex gap-2">
                    <SessionIcon tooltipDescription="Page">
                      <div className="flex h-5 items-center">
                        <FileIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </SessionIcon>
                    <Link
                      to={url}
                      className="break-all transition-colors hover:text-link"
                    >
                      {url}
                    </Link>
                  </div>
                )}
                {ua.os.name && ua.os.version && (
                  <div className="flex gap-2">
                    <SessionIcon tooltipDescription="System">
                      <div className="flex h-5 items-center">
                        <DesktopIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </SessionIcon>
                    <p>{`${ua.os.name} ${ua.os.version}`}</p>
                  </div>
                )}
                {ua.browser.name && ua.browser.version && (
                  <div className="flex gap-2">
                    <SessionIcon tooltipDescription="Browser">
                      <div className="flex h-5 items-center">
                        <GlobeIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </SessionIcon>
                    <p>{`${ua.browser.name} ${ua.browser.version}`}</p>
                  </div>
                )}
                {resolution && (
                  <div className="flex gap-2">
                    <SessionIcon tooltipDescription="Screen Size">
                      <div className="flex h-5 items-center">
                        <SizeIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </SessionIcon>
                    <p>{resolution}</p>
                  </div>
                )}
              </div>
            </div>
            {Object.keys(meta).length > 0 && (
              <div className="border-t">
                <h3 className="my-2 font-medium">Custom Data</h3>
                <div className="grid grid-cols-1 gap-x-1 gap-y-2 md:grid-cols-2">
                  {Object.entries(meta).map(([key, value]) => (
                    <MetaItem key={key} label={key} value={value} />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  updateFeedbackStatus.mutate({
                    id,
                    projectId,
                    status:
                      status === FeedbackStatus.archived
                        ? FeedbackStatus.new
                        : FeedbackStatus.archived,
                  });
                }}
              >
                {status === FeedbackStatus.archived ? "Unarchive" : "Archive"}
              </Button>
              {status === FeedbackStatus.new && (
                <ReplyButton email={reportIdentifier} />
              )}
            </div>
          </>
        )}
      </div>
    </motion.button>
  );
}

const SessionIcon = (props: {
  children: React.ReactNode;
  tooltipDescription: string;
}) => (
  <TooltipProvider>
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>{props.children}</TooltipTrigger>
      <TooltipContent sideOffset={5}>{props.tooltipDescription}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const MetaItem = (props: {
  label: string;
  value:
    | string
    | number
    | boolean
    | object
    | Array<string | number | boolean | object>;
}) => {
  let value = props.value;

  if (Array.isArray(value)) {
    if (value.length === 0) {
      value = "Empty";
      return;
    }

    value = value.join(", ");
  }

  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  if (typeof value === "boolean") {
    value = value.toString();
  }

  return (
    <div className="flex flex-col">
      <div className="text-xs text-muted-foreground">{props.label}</div>
      <div className="break-words">{value}</div>
    </div>
  );
};

const ReplyButton = (props: { email: string | null }) => {
  if (!props.email) {
    return null;
  }

  const isEmailValid = props.email.match(/.+@.+\..+/);

  if (!isEmailValid) {
    return null;
  }

  return (
    <Button size="sm" asChild>
      <Link to={`mailto:${props.email}`}>Reply</Link>
    </Button>
  );
};
