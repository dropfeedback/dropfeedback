import { useRouter } from "next/router";

export const PATHS = {
  Home: "/",
  SignIn: "/signin",
  SignUp: "/signup",
  Dashboard: "/dashboard",
  Settings: "/settings",
} as const;

export type Path = (typeof PATHS)[keyof typeof PATHS];

export const useTypeSafeRouter = () => {
  const router = useRouter();

  const push = (path: Path) => {
    return router.push(path);
  };

  const replace = (path: Path) => {
    return router.replace(path);
  };

  const pathname = router.pathname as Path;

  return {
    push,
    replace,
    pathname,
  };
};
