import "@feedbacky/widget-core";

export interface DropFeedbackProps {
  projectId: string;
  theme?: {
    scheme?: "light" | "dark";
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  defaultButton?: {
    position?: "left" | "right";
    enabled?: boolean;
  };
  meta?: Record<string, any>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "feedbacky-widget": {
        "project-id"?: string;
        "theme-scheme"?: "light" | "dark";
        "theme-primary-color"?: string;
        "theme-background-color"?: string;
        "theme-text-color"?: string;
        "default-button-position"?: "left" | "right";
        "default-button-enabled"?: boolean;
      };
    }
  }
}

export const DropFeedback = ({
  projectId,
  theme,
  defaultButton = {},
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
    <feedbacky-widget
      project-id={projectId}
      theme-scheme={theme?.scheme}
      theme-primary-color={theme?.primaryColor}
      theme-background-color={theme?.backgroundColor}
      default-button-position={defaultButton?.position}
      default-button-enabled={defaultButton?.enabled}
      theme-text-color={theme?.textColor}
      {...metaProps}
    />
  );
};
