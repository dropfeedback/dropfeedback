import { useParams } from "react-router-dom";
import React, { createContext, useContext, useState } from "react";
import { FeedbackStatus, type FiltersAndSorters } from "@/types";

type Count = {
  all?: number;
  issue?: number;
  idea?: number;
  other?: number;
  archived?: number;
  countNew?: number;
};

type FeedbackContextType = {
  projectId: string;
  filtersAndSorters: FiltersAndSorters;
  setFiltersAndSorters: React.Dispatch<React.SetStateAction<FiltersAndSorters>>;
  counts: Count;
  setCounts: React.Dispatch<React.SetStateAction<Count>>;
};

const defaultFiltersAndSorters: FiltersAndSorters = {
  filters: { search: "", status: FeedbackStatus.new },
  sorters: { createdAt: "desc" },
};

export const FeedbackContext = createContext<FeedbackContextType>({
  projectId: "",
  filtersAndSorters: defaultFiltersAndSorters,
  setFiltersAndSorters: () => {},
  counts: {},
  setCounts: () => {},
});

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const [counts, setCounts] = useState<Count>({});

  const [filtersAndSorters, setFiltersAndSorters] = useState<FiltersAndSorters>(
    defaultFiltersAndSorters,
  );

  return (
    <FeedbackContext.Provider
      value={{
        projectId,
        filtersAndSorters,
        setFiltersAndSorters,
        counts,
        setCounts,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedbackContext must be used within FeedbackProvider");
  }
  return context;
}
