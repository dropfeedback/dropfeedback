import { cn } from "@/lib";
import { AuthForm } from "@/components/auth-form";
import { PATHS, Path } from "@/hooks/useTypeSafeRouter";
import Link from "next/link";

export default function Signup() {
  return (
    <div
      className={cn(
        "min-h-screen max-w-sm mx-auto",
        "flex flex-col items-center justify-center",
      )}
    >
      <AuthForm type="signup" />

      <div className="mt-4">
        <Link href={PATHS.SignIn} className="text-blue-500 hover:underline">
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}

Signup.redirectIfAuthenticated = "/dashboard" satisfies Path;
