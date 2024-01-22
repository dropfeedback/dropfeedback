import React from "react";
import { DropFeedback } from "@dropfeedback/react";

export default function Root({ children }) {
  return (
    <>
      <DropFeedback projectId="123" />
      {children}
    </>
  );
}
