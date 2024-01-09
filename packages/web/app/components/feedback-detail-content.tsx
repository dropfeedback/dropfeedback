import { Link, useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import UAParser from "ua-parser-js";
import {
  DesktopIcon,
  FileIcon,
  GlobeIcon,
  PersonIcon,
  SizeIcon,
  SlashIcon,
} from "@radix-ui/react-icons";
import { FeedbackTooltip } from "./feedback-tooltip";
import { ReplyButton } from "./feedback-reply-button";
import { MetaItem } from "./feedback-meta-item";
import { FeedbackCategoryBadge } from "./feedback-category-badge";
import { FeedbackDetailContentSkeleton } from "./feedback-detail-content-skeleton";
import { fetchers } from "~/lib/fetchers";
import { type Feedback, FeedbackStatus } from "~/types";

export const FeedbackDetailContent = () => {
  const { feedbackId, projectId } = useParams<{
    feedbackId: string;
    projectId: string;
  }>();
  if (!projectId) throw new Error("Project ID is required");
  if (!feedbackId) throw new Error("Feedback ID is required");

  const { data, isPending, isError } = useQuery<Feedback>({
    queryKey: ["feedbacks", projectId, "detail", feedbackId],
    queryFn: () => {
      return fetchers.getFeedback(feedbackId);
    },
  });

  if (isError) return <p>Could not load feedback</p>;
  if (isPending) return <FeedbackDetailContentSkeleton />;

  const uaParser = new UAParser(data.device);
  const ua = uaParser.getResult();

  return (
    <div className="w-full overflow-hidden text-left">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FeedbackCategoryBadge variant={data.category} />
          {data.status === FeedbackStatus.archived && (
            <>
              <SlashIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <div className="inline-flex select-none items-center rounded-md bg-stone-100 px-2.5 py-0.5 text-xs font-semibold  hover:bg-stone-100  dark:bg-stone-800 hover:dark:bg-stone-800">
                {data.status}
              </div>
            </>
          )}
        </div>
        <p className="text-base">{data.content}</p>
        <h3 className="mt-4 font-medium">Session</h3>
        <div className="grid grid-cols-1 gap-x-1 gap-y-2 md:grid-cols-2">
          {data.reportIdentifier && (
            <div className="flex gap-2">
              <FeedbackTooltip tooltip="Reporter">
                <div className="flex h-5 items-center">
                  <PersonIcon className="flex-shrink-0 text-muted-foreground" />
                </div>
              </FeedbackTooltip>
              <p className="break-all">{data.reportIdentifier}</p>
            </div>
          )}
          {data.url && (
            <div className="flex gap-2">
              <FeedbackTooltip tooltip="Page">
                <div className="flex h-5 items-center">
                  <FileIcon className="flex-shrink-0 text-muted-foreground" />
                </div>
              </FeedbackTooltip>
              <Link
                to={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all transition-colors hover:text-link"
              >
                {data.url}
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
          {data.resolution && (
            <div className="flex gap-2">
              <FeedbackTooltip tooltip="Screen Size">
                <div className="flex h-5 items-center">
                  <SizeIcon className="flex-shrink-0 text-muted-foreground" />
                </div>
              </FeedbackTooltip>
              <p>{data.resolution}</p>
            </div>
          )}
        </div>
        {Object.keys(data.meta).length > 0 && (
          <>
            <h3 className="mt-4 font-medium">Custom Data</h3>
            <div className="grid grid-cols-1 gap-x-1 gap-y-2 md:grid-cols-2">
              {Object.entries(data.meta).map(([key, value]) => (
                <MetaItem key={key} label={key} value={value} />
              ))}
            </div>
          </>
        )}

        <div className="ml-auto mt-8">
          {data.status === FeedbackStatus.new && (
            <ReplyButton email={data.reportIdentifier} />
          )}
        </div>
      </div>
    </div>
  );
};
