import { Path } from "@/hooks/useTypeSafeRouter";
import { cn } from "@/lib";
import Link from "next/link";

export default function Home() {
  return (
    <div className={cn("flex flex-col", "w-max mx-auto")}>
      <div className={cn("text-7xl mt-6 text-center")}>Feedbacky</div>

      <div className={cn("mt-24")}>
        <h1 className={cn("text-4xl")}>Get feedback. Make it happen 🚀</h1>
        <p className={cn("text-2xl", "text-muted-foreground")}>
          It&apos;s never been easier to crowdsource your decisions.
        </p>
      </div>

      <div className={cn("mt-4")}>
        <Link
          href="/signup"
          className={cn(
            "inline-block",
            "px-6 py-4",
            "text-2xl",
            "rounded-md",
            "bg-primary-foreground",
          )}
        >
          Get started for free →
        </Link>
      </div>
    </div>
  );
}

Home.redirectIfAuthenticated = "/dashboard" satisfies Path;
