import React from "react";
import "@feedbacky/widget-core";

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
  return <feedbacky-widget project-id={projectId}></feedbacky-widget>;
};
