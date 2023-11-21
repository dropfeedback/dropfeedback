import { useParams } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchers } from "~/lib/fetchers";
import { Separator } from "~/components/ui/separator";
import { Toolbar } from "~/components/feedbacks/toolbar";
import { FeedbackDetail } from "~/components/feedbacks/detail";
import { Inbox } from "~/components/feedbacks/inbox";
import { type FeedbackQueryType } from "~/types";

const pageSize = 10;

export default function Feedbacks() {
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isPending, isError, fetchNextPage } =
    useInfiniteQuery<FeedbackQueryType>({
      queryKey: ["feedbacks", { projectId }],
      queryFn: ({ pageParam }) => {
        const cursor = (pageParam as string) ?? "";

        return fetchers.getFeedbacks({
          projectId: projectId!,
          cursor,
          take: pageSize,
        });
      },
      enabled: !!projectId,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? undefined,
      initialPageParam: "",
    });

  if (isError) return null;

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full bg-background ">
      <div className="container py-8">
        <Toolbar />
        <Separator className="my-6" />
        <div className="flex gap-2">
          <div className="h-[calc(100vh-16rem)] w-1/3 overflow-auto">
            <Inbox pages={data.pages} fetchNextPage={fetchNextPage} />
          </div>
          <div className="w-2/3">
            <FeedbackDetail />
          </div>
        </div>
      </div>
    </div>
  );
}
