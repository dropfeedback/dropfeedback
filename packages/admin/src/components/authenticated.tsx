import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useMe } from "@/data-hooks";

type Props = {
  loading?: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
} & PropsWithChildren;

/**
 * This component is used to wrap routes that require authentication.
 * If the user is authenticated, it will render the children.
 * If the user is not authenticated, it will render the `fallback` prop if it's provided, otherwise it will redirect to the `redirectTo` prop.
 * @default loading: A loading spinner
 * @default redirectTo: "/login"
 */
export const Authenticated = ({
  fallback,
  loading = (
    <div>
      <div className="flex h-screen items-center justify-center space-x-2 bg-white dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black"></div>
      </div>
    </div>
  ),
  redirectTo = "/login",
  children,
}: Props) => {
  const { data, isLoading } = useMe();
  const isAuthenticated = !!data;

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!isAuthenticated) {
    if (typeof fallback !== "undefined") {
      return <>{fallback}</>;
    } else {
      return <Navigate to={redirectTo} />;
    }
  }

  return children;
};
