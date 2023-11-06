"use client";

import React from "react";
import "@feedbacky/widget-core";

export interface FeedbackyProps {
  projectId: string;
  theme?: {
    scheme?: "light" | "dark";
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  position?: "left" | "right";
  meta?: Record<string, any>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "feedbacky-widget": {
        "project-id": string;
        "theme-scheme"?: "light" | "dark";
        "theme-primary-color"?: string;
        "theme-background-color"?: string;
        "theme-text-color"?: string;
        position?: "left" | "right";
      };
    }
  }
}

export const Feedbacky = ({
  projectId,
  position,
  theme,
  meta = {},
}: FeedbackyProps) => {
  const metaProps = Object.keys(meta).reduce(
    (acc, key) => {
      acc[`meta-${key}`] = meta[key];
      return acc;
    },
    {} as Record<string, any>,
  );

  return (
    <feedbacky-widget
      project-id={projectId}
      position={position}
      theme-scheme={theme?.scheme}
      theme-primary-color={theme?.primaryColor}
      theme-background-color={theme?.backgroundColor}
      theme-text-color={theme?.textColor}
      {...metaProps}
    />
  );
};
