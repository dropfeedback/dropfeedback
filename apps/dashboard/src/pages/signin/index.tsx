import { cn } from "@/lib";
import { AuthForm } from "@/components/auth-form";
import { PATHS, Path } from "@/hooks/useTypeSafeRouter";
import Link from "next/link";
import { useAuth } from "@/context/auth-context/auth-context";

export default function Signin() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null;
  }

  return (
    <div
      className={cn(
        "min-h-screen max-w-sm mx-auto",
        "flex flex-col items-center justify-center",
      )}
    >
      <AuthForm type="signin" />

      <div className="mt-4">
        <Link href={PATHS.SignIn} className="text-blue-500 hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}

Signin.redirectIfAuthenticated = "/dashboard" satisfies Path;
