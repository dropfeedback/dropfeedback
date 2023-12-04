import { Fragment, useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { fetchers } from "~/lib/fetchers";
import { FeedbackCard } from "~/components/feedback-card";
import { FeedbackFilter } from "~/components/feedback-filter";
import { FeedbackCardSkeleton } from "~/components/feedback-card-skeleton";
import { LoadingIndicator } from "~/components/loading-indicator";
import { type FeedbackQueryType } from "~/types";

const pageSize = 10;

export default function Feedbacks() {
  const { projectId } = useParams<{ projectId: string }>();
  const { ref, inView } = useInView();
  const [openedCardId, setOpenedCardId] = useState("");

  const { data, isPending, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<FeedbackQueryType>({
      queryKey: ["feedbacks", projectId],
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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError) return <p>Cound not load feedbacks</p>;

  return (
    <div className="bg-background">
      <div className="container">
        <div className="flex min-h-[calc(100vh-105px)] flex-wrap gap-8 pt-8 md:flex-nowrap">
          <FeedbackFilter />
          <h2 className="w-full text-center text-3xl tracking-wide md:hidden">
            Feedback
          </h2>
          <div className="flex w-full flex-col">
            {isPending ? (
              [...Array(5)].map((_, index) => (
                <FeedbackCardSkeleton key={index} />
              ))
            ) : (
              <>
                <div className="mb-6">
                  {data.pages.map((page) => (
                    <Fragment key={page.nextCursor}>
                      {page.data.map((feedback, index) => (
                        <FeedbackCard
                          key={feedback.id}
                          openedCardId={openedCardId}
                          setOpenedCardId={setOpenedCardId}
                          {...feedback}
                        />
                      ))}
                    </Fragment>
                  ))}
                </div>
                {hasNextPage && (
                  <div ref={ref} className="mb-4 flex justify-center">
                    <LoadingIndicator className="mr-2" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
