import { Fragment, useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { fetchers } from "~/lib/fetchers";
import { FeedbackCard } from "~/components/feedback-card";
import FeedbackFilter from "~/components/feedback-filter";
import { type FeedbackQueryType } from "~/types";

const pageSize = 10;

export default function Feedbacks() {
  const { projectId } = useParams<{ projectId: string }>();
  const { ref, inView } = useInView();
  const [openedCardId, setOpenedCardId] = useState("");

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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const getRandomCategory = (index: number) => {
    const categories = ["Issue", "Idea", "Other"];
    return categories[index % categories.length];
  };

  if (isError) return <p>Cound not load feedbacks</p>;

  return (
    <div className="bg-background">
      <div className="container">
        <div className="flex gap-8 pt-8">
          <FeedbackFilter />
          <div className="flex flex-col">
            {isPending ? (
              <div>Loading...</div>
            ) : (
              <>
                <div>
                  {data.pages.map((page) => (
                    <Fragment key={page.nextCursor}>
                      {page.data.map((feedback, index) => (
                        <FeedbackCard
                          key={feedback.id}
                          openedCardId={openedCardId}
                          setOpenedCardId={setOpenedCardId}
                          category={getRandomCategory(index)}
                          {...feedback}
                        />
                      ))}
                    </Fragment>
                  ))}
                </div>
                <div ref={ref}>Loading...</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
