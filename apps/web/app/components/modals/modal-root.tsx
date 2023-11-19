import { useLocation, useSearchParams } from "@remix-run/react";
import { CreateProject } from "./create-project";

export function ModalRoot() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (!location.pathname.startsWith("/dashboard")) return null;

  switch (searchParams.get("modal")) {
    case "create-project":
      return <CreateProject />;
    default:
      return null;
  }
}
