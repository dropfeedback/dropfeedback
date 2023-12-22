import "@dropfeedback/core";

export interface DropFeedbackProps {
  projectId: string;
  theme?: {
    scheme?: "light" | "dark";
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  meta?: Record<string, any>;
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
      };
    }
  }
}

export const DropFeedback = ({
  projectId,
  theme,
  meta = {},
}: DropFeedbackProps) => {
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
      {...metaProps}
    />
  );
};
