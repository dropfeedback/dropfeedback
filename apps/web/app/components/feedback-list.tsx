import { Fragment, useContext, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { FeedbackCardSkeleton } from "./feedback-card-skeleton";
import { FeedbackCard } from "./feedback-card";
import { LoadingIndicator } from "./loading-indicator";
import { fetchers } from "~/lib/fetchers";
import { type FeedbackQueryType } from "~/types";
import { FeedbackContext } from "./feedback-provider";

const PAGE_SIZE = 10;

export function FeedbackList() {
  const { ref, inView } = useInView();
  const [openedCardId, setOpenedCardId] = useState("");
  const { projectId, currentFilter, setCounts, counts, orderBy } =
    useContext(FeedbackContext);

  const { data, isPending, isError, fetchNextPage, hasNextPage, status } =
    useInfiniteQuery<FeedbackQueryType>({
      queryKey: ["feedbacks", projectId, { ...currentFilter, ...orderBy }],
      queryFn: ({ pageParam }) => {
        const cursor = (pageParam as string) ?? "";

        return fetchers.getFeedbacks({
          projectId: projectId!,
          cursor,
          take: PAGE_SIZE,
          category: currentFilter.category,
          search: currentFilter.search ?? "",
          status: currentFilter.status,
          orderBy,
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
    if (status === "success") {
      setCounts({
        all: data.pages[0].countAll,
        current: data.pages[0].countCurrent,
        issue: data.pages[0].countIssue,
        idea: data.pages[0].countIdea,
        other: data.pages[0].countOther,
        archive: data.pages[0].countArchived,
      });
    }
  }, [status, data, setCounts]);

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
          {hasNextPage && (counts.current ?? 0) > PAGE_SIZE && (
            <div ref={ref} className="mb-4 flex justify-center">
              <LoadingIndicator className="mr-2" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
