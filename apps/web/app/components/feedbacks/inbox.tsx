import { useRef, useEffect } from "react";
import { type InfiniteData } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { FeedbackCard } from "./card";
import { type FeedbackQueryType } from "~/types";

export function Inbox({
  pages,
  fetchNextPage,
}: {
  pages: InfiniteData<FeedbackQueryType, string>["pages"];
  fetchNextPage: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      fetchNextPage();
    }
  }, [fetchNextPage, isInView]);

  return (
    <div className="border-r pr-2">
      {pages.map((page) =>
        page.data.map((feedback) => (
          <FeedbackCard key={feedback.id} {...feedback} />
        )),
      )}
      <div ref={ref}>Loading...</div>
    </div>
  );
}
