import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import useLocalStorageState from "use-local-storage-state";
import { fetchers } from "@/lib/fetchers";
import { type FeedbacksQueryResponse } from "@/types";
import { FeedbackCardSkeleton } from "./feedback-card-skeleton";
import { FeedbackCard } from "./feedback-card";
import { LoadingIndicator } from "./loading-indicator";
import { useFeedbackContext } from "./feedback-provider";
import { FeedbackEmptyView } from "./feedback-empty-view";
import { FeedbackFilterEmptyView } from "./feedback-filter-empty-view";

const PAGE_SIZE = 10;

export function FeedbackList() {
  const { ref, inView } = useInView();
  const { projectId, filtersAndSorters, setCounts } = useFeedbackContext();
  const [openedCardId, setOpenedCardId] = useLocalStorageState(
    `selected-card-${projectId}`,
    {
      defaultValue: "",
    },
  );

  const { data, isPending, isError, fetchNextPage, hasNextPage, status } =
    useInfiniteQuery<FeedbacksQueryResponse>({
      queryKey: ["feedbacks", projectId, { ...filtersAndSorters }],
      queryFn: ({ pageParam }) => {
        const cursor = (pageParam as string) ?? "";

        return fetchers.getFeedbacks({
          projectId,
          params: {
            cursor,
            take: PAGE_SIZE,
            ...filtersAndSorters.filters,
            orderBy: filtersAndSorters.sorters,
          },
        });
      },
      enabled: !!projectId,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? undefined,
      initialPageParam: "",
    });

  useEffect(() => {
    if (inView) {
      void (async () => {
        await fetchNextPage();
      })();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (status === "success") {
      setCounts({
        all: data.pages[data.pages.length - 1].countAll,
        countNew: data.pages[data.pages.length - 1].countNew,
        issue: data.pages[data.pages.length - 1].countIssue,
        idea: data.pages[data.pages.length - 1].countIdea,
        other: data.pages[data.pages.length - 1].countOther,
        archived: data.pages[data.pages.length - 1].countArchived,
      });
    }
  }, [status, data, setCounts]);

  if (isError) return <p>Could not load feedbacks</p>;

  if (isPending) {
    return (
      <div className="flex w-full flex-col">
        {[...Array(5)].map((_, index) => (
          <FeedbackCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (data.pages[data.pages.length - 1].countAll === 0)
    return <FeedbackEmptyView />;

  if (data.pages[0].data.length === 0) return <FeedbackFilterEmptyView />;

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6">
        {data.pages.map((page) => (
          <Fragment key={page.nextCursor}>
            {page.data.map((feedback) => (
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
      {hasNextPage &&
        data.pages[data.pages.length - 1].countCurrent > PAGE_SIZE && (
          <div ref={ref} className="mb-4 flex justify-center">
            <LoadingIndicator className="mr-2" />
          </div>
        )}
    </div>
  );
}
