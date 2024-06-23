import { useLocation, useSearchParams } from "react-router-dom";
import { CreateProject } from "./create-project";

export function ModalRoot() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (!location.pathname.startsWith("/projects")) return null;

  switch (searchParams.get("modal")) {
    case "create-project":
      return <CreateProject />;
    default:
      return null;
  }
}
