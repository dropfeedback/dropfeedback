import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();

  return (
    <div
      className={cn(
        "min-h-screen max-w-sm mx-auto",
        "flex flex-col items-center justify-center",
      )}
    >
      <h1>Settings</h1>

      <div className="mt-4">
        <Button
          onClick={() => router.push("/dashboard")}
          className="text-blue-500 hover:underline"
        >
          Go to dashboard
        </Button>
      </div>
    </div>
  );
}

Settings.auth = true;
