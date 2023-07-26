import { cn } from "@/lib";
import { AuthForm } from "@/components/auth-form";

export default function Signin() {
  return (
    <div
      className={cn(
        "min-h-screen max-w-sm mx-auto",
        "flex flex-col items-center justify-center",
      )}
    >
      <AuthForm type="signin" />

      <div className="mt-4">
        <a href="/signup" className="text-blue-500 hover:underline">
          Create an account
        </a>
      </div>
    </div>
  );
}
