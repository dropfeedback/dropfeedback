import { Link, useNavigate, useParams } from "@remix-run/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeftIcon,
  ArchiveIcon,
  ResetIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { fetchers } from "~/lib/fetchers";
import { getRelativeTime } from "~/lib/utils";
import { type ApiError } from "~/lib/axios";
import { FeedbackStatus, type Feedback } from "~/types";

type UpdateFeedbackStatusVariables = {
  id: string;
  projectId: string;
  status: FeedbackStatus;
};

export function FeedbackDetailHeader() {
  const { feedbackId, projectId } = useParams<{
    feedbackId: string;
    projectId: string;
  }>();
  if (!projectId) throw new Error("Project ID is required");
  if (!feedbackId) throw new Error("Feedback ID is required");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isError } = useQuery<Feedback>({
    queryKey: ["feedbacks", projectId, "detail", feedbackId],
    queryFn: () => {
      return fetchers.getFeedback(feedbackId);
    },
    staleTime: Infinity,
  });

  const updateFeedbackStatus = useMutation<
    Feedback,
    ApiError,
    UpdateFeedbackStatusVariables
  >({
    mutationFn: (variables) => fetchers.updateFeedbackStatus(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", projectId],
      });
    },
  });

  const archiveFeedback = () => {
    updateFeedbackStatus.mutate({
      id: feedbackId,
      projectId,
      status: FeedbackStatus.archived,
    });
  };

  const unarchiveFeedback = () => {
    updateFeedbackStatus.mutate({
      id: feedbackId,
      projectId,
      status: FeedbackStatus.new,
    });
  };

  const isEmailValid = data?.reportIdentifier?.match(/.+@.+\..+/);

  if (isError) return null;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Go back to the feedback list</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Go back</TooltipContent>
        </Tooltip>
        <div className="flex items-center gap-1">
          {data?.createdAt ? (
            <time
              className="text-xs text-muted-foreground"
              dateTime={data.createdAt}
            >
              {getRelativeTime(data.createdAt)}
            </time>
          ) : (
            <Skeleton className="h-4 w-28" />
          )}
          <Separator orientation="vertical" className="mx-1 h-6" />
          {data?.status ? (
            data.status === FeedbackStatus.archived ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!data?.status}
                    onClick={() => {
                      unarchiveFeedback();
                    }}
                  >
                    <ResetIcon className="h-4 w-4" />
                    <span className="sr-only">Unarchive</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Unarchive</TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!data?.status}
                    onClick={() => {
                      archiveFeedback();
                    }}
                  >
                    <ArchiveIcon className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Archive</TooltipContent>
              </Tooltip>
            )
          ) : (
            <div className="flex h-9 w-9 items-center justify-center">
              <Skeleton className="h-4 w-4" />
            </div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                disabled={!data?.reportIdentifier || !isEmailValid}
              >
                <Link to={`mailto:${data?.reportIdentifier}`}>
                  <PaperPlaneIcon className="h-4 w-4" />
                  <span className="sr-only">Reply</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Reply</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
