import { Fragment, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { FeedbackCardSkeleton } from "./feedback-card-skeleton";
import { FeedbackCard } from "./feedback-card";
import { LoadingIndicator } from "./loading-indicator";
import { useFeedbackContext } from "./feedback-provider";
import { fetchers } from "~/lib/fetchers";
import { type FeedbackQueryType } from "~/types";

const PAGE_SIZE = 10;

export function FeedbackList() {
  const { ref, inView } = useInView();
  const [openedCardId, setOpenedCardId] = useState("");
  const { projectId, filtersAndSorters, setCounts } = useFeedbackContext();

  const { data, isPending, isError, isStale, fetchNextPage, hasNextPage, status } =
    useInfiniteQuery<FeedbackQueryType>({
      queryKey: ["feedbacks", projectId, { ...filtersAndSorters }],
      queryFn: ({ pageParam }) => {
        const cursor = (pageParam as string) ?? "";

        return fetchers.getFeedbacks({
          projectId: projectId!,
          cursor,
          take: PAGE_SIZE,
          ...filtersAndSorters.filters,
          orderBy: filtersAndSorters.sorters,
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

  useEffect(() => {
    if (status === "success" && !isStale) {
      setCounts({
        all: data.pages[data.pages.length - 1].countAll,
        countNew: data.pages[data.pages.length - 1].countNew,
        issue: data.pages[data.pages.length - 1].countIssue,
        idea: data.pages[data.pages.length - 1].countIdea,
        other: data.pages[data.pages.length - 1].countOther,
        archive: data.pages[data.pages.length - 1].countArchived,
      });
    }
  }, [status, data, setCounts, isStale]);

  if (isError) return <p>Cound not load feedbacks</p>;

  return (
    <div className="flex w-full flex-col">
      {isPending ? (
        [...Array(5)].map((_, index) => <FeedbackCardSkeleton key={index} />)
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
          {hasNextPage && data.pages[data.pages.length - 1].countCurrent > PAGE_SIZE && (
            <div ref={ref} className="mb-4 flex justify-center">
              <LoadingIndicator className="mr-2" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
