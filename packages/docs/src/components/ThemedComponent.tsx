import { useColorMode } from "@docusaurus/theme-common";

type ThemedComponentProps = {
  theme: "dark" | "light";
  children: React.ReactNode;
};

export const ThemedComponent = ({ theme, children }: ThemedComponentProps) => {
  const { colorMode } = useColorMode();

  if (theme !== colorMode) {
    return null;
  }

  return children;
};
