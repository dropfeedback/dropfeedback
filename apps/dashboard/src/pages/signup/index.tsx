import { cn } from "@/lib";
import { AuthForm } from "@/components/auth-form";

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
        <a href="/signin" className="text-blue-500 hover:underline">
          Already have an account? Sign In
        </a>
      </div>
    </div>
  );
}
