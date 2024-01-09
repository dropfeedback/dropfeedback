import {
  DesktopIcon,
  FileIcon,
  GlobeIcon,
  PersonIcon,
  OpenInNewWindowIcon,
  SizeIcon,
} from "@radix-ui/react-icons";
import UAParser from "ua-parser-js";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@remix-run/react";
import { cn, getRelativeTime } from "~/lib/utils";
import { Button } from "./ui/button";
import { ReplyButton } from "./feedback-reply-button";
import { MetaItem } from "./feedback-meta-item";
import { FeedbackTooltip } from "./feedback-tooltip";
import { FeedbackCategoryBadge } from "./feedback-category-badge";
import { useFeedbackContext } from "./feedback-provider";
import { fetchers } from "~/lib/fetchers";
import { type Feedback, FeedbackStatus } from "~/types";
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
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed="false"
      aria-label="Open feedback card to see more details"
      whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
      className={cn(
        "block w-full cursor-pointer select-text overflow-hidden border-b border-l-2 border-l-transparent p-2 text-left opacity-0 transition-all last:border-none",
        {
          "cursor-auto  border-l-muted-foreground bg-accent/70": isOpen,
        },
      )}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
          e.preventDefault();
          setOpenedCardId(id);
        }
      }}
      onClick={() => setOpenedCardId(id)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <time
              className="text-xs text-muted-foreground"
              dateTime={createdAt}
            >
              {getRelativeTime(createdAt)}
            </time>
            <FeedbackCategoryBadge variant={category} />
          </div>
          <Button
            size="icon"
            title="Details"
            variant="ghost"
            className="h-6 w-6"
            aria-label="Details"
            asChild
          >
            <Link to={`/dashboard/${projectId}/feedback/${id}`}>
              <OpenInNewWindowIcon className="text-muted-foreground" />
            </Link>
            <span className="sr-only">Open feedback details</span>
          </Button>
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
                    <FeedbackTooltip tooltip="Reporter">
                      <div className="flex h-5 items-center">
                        <PersonIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </FeedbackTooltip>
                    <p className="break-all">{reportIdentifier}</p>
                  </div>
                )}
                {url && (
                  <div className="flex gap-2">
                    <FeedbackTooltip tooltip="Page">
                      <div className="flex h-5 items-center">
                        <FileIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </FeedbackTooltip>
                    <Link
                      to={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all transition-colors hover:text-link"
                    >
                      {url}
                    </Link>
                  </div>
                )}
                {ua.os.name && ua.os.version && (
                  <div className="flex gap-2">
                    <FeedbackTooltip tooltip="System">
                      <div className="flex h-5 items-center">
                        <DesktopIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </FeedbackTooltip>
                    <p>{`${ua.os.name} ${ua.os.version}`}</p>
                  </div>
                )}
                {ua.browser.name && ua.browser.version && (
                  <div className="flex gap-2">
                    <FeedbackTooltip tooltip="Browser">
                      <div className="flex h-5 items-center">
                        <GlobeIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </FeedbackTooltip>
                    <p>{`${ua.browser.name} ${ua.browser.version}`}</p>
                  </div>
                )}
                {resolution && (
                  <div className="flex gap-2">
                    <FeedbackTooltip tooltip="Screen Size">
                      <div className="flex h-5 items-center">
                        <SizeIcon className="flex-shrink-0 text-muted-foreground" />
                      </div>
                    </FeedbackTooltip>
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
              {reportIdentifier && <ReplyButton email={reportIdentifier} />}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
