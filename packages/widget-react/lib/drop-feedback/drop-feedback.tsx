import { useEffect } from "react";

export interface DropFeedbackProps {
  projectId: string;
  theme?: {
    scheme?: "light" | "dark";
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  meta?: Record<string, any>;
  reportIdentifier?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "drop-feedback": {
        "project-id"?: string;
        "theme-scheme"?: "light" | "dark";
        "theme-primary-color"?: string;
        "theme-background-color"?: string;
        "theme-text-color"?: string;
        "report-identifier"?: string;
      };
    }
  }
}

export const DropFeedback = ({
  projectId,
  theme,
  meta = {},
  reportIdentifier,
}: DropFeedbackProps) => {
  useEffect(() => {
    if ((window as any).__drop_feedback_injected__) return;
    (window as any).__drop_feedback_injected__ = true;

    const script = document.createElement("script");
    script.src = `https://unpkg.com/@dropfeedback/core`;
    script.type = "module";
    script.defer = true;

    const onScriptError = () => script.remove();
    script.addEventListener("error", onScriptError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("error", onScriptError);
    };
  }, []);

  const metaProps = Object.keys(meta).reduce(
    (acc, key) => {
      acc[`meta-${key}`] = meta[key];
      return acc;
    },
    {} as Record<string, any>,
  );

  return (
    <drop-feedback
      project-id={projectId}
      theme-scheme={theme?.scheme}
      theme-primary-color={theme?.primaryColor}
      theme-background-color={theme?.backgroundColor}
      theme-text-color={theme?.textColor}
      report-identifier={reportIdentifier}
      {...metaProps}
    />
  );
};
