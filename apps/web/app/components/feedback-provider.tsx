import { useParams } from "@remix-run/react";
import React, { createContext, useState } from "react";
import { type OrderBy, type FeedbackFilter } from "~/types";

type Count = {
  all?: number;
  current?: number;
  issue?: number;
  idea?: number;
  other?: number;
  archive?: number;
};

type FeedbackContextType = {
  projectId: string;
  currentFilter: FeedbackFilter;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FeedbackFilter>>;
  counts: Count;
  setCounts: React.Dispatch<React.SetStateAction<Count>>;
  orderBy: OrderBy;
  setOrderBy: React.Dispatch<React.SetStateAction<OrderBy>>;
};

export const FeedbackContext = createContext<FeedbackContextType>({
  projectId: "",
  currentFilter: {
    search: "",
  },
  setCurrentFilter: () => {},
  counts: {},
  setCounts: () => {},
  orderBy: { createdAt: "desc" },
  setOrderBy: () => {},
});

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const [currentFilter, setCurrentFilter] = useState<FeedbackFilter>({
    search: "",
  });
  const [counts, setCounts] = useState<Count>({});
  const [orderBy, setOrderBy] = useState<OrderBy>({ createdAt: "desc" });

  return (
    <FeedbackContext.Provider
      value={{
        projectId,
        currentFilter,
        setCurrentFilter,
        counts,
        setCounts,
        orderBy,
        setOrderBy,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
