import { useCallback, useRef } from "react";
import { useParams } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchers } from "~/lib/fetchers";
import { type Feedback } from "~/types";

const pageSize = 5;

export default function Feedbacks() {
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isPending, isError, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery<{
      data: Feedback[];
      nextCursor: string | null;
      prevCursor: string | null;
      total: number;
    }>({
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
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      getPreviousPageParam: (firstPage) => firstPage.prevCursor,
      initialPageParam: { nextCursor: null },
    });

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isPending || isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isPending, hasNextPage],
  );

  if (isError) return null;

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Feedbacks</h1>
      <ul>
        {data?.pages.map((page) =>
          page.data.map((feedback) => (
            <li
              key={feedback.id}
              ref={
                page.data[page.data.length - 1].id === feedback.id
                  ? lastElementRef
                  : null
              }
            >
              <div>{feedback.id}</div>
              <div>{feedback.content}</div>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
