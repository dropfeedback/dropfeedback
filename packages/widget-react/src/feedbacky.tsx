import React from "react";
import { useFeedbacky } from "./useFeedbacky";

export interface FeedbackyProps {
  projectId: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "feedbacky-widget": {
        "project-id": string;
      };
    }
  }
}

export const Feedbacky = ({ projectId }: FeedbackyProps) => {
  useFeedbacky();

  console.log("Feedbacky widget loaded", projectId);

  return <feedbacky-widget project-id={projectId}></feedbacky-widget>;
};
