import { useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import { fetchers } from "~/lib/fetchers";

export default function Feedbacks() {
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isPending, isError } = useQuery({
    queryKey: ["feedbacks", { projectId }],
    queryFn: () => fetchers.getFeedbacks({ projectId: projectId! }),
    enabled: !!projectId,
  });

  if (isError) return null;

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Feedbacks</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
