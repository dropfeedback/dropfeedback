import { useNavigate, useSearchParams } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { LoadingIndicator } from "~/components/loading-indicator";
import { Button } from "~/components/ui/button";
import { fetchers, setAuthCookies } from "~/lib/fetchers";
import type { ApiError } from "~/lib/axios";
import type { VerifyEmailPayload, VerifyEmailResponse } from "~/types";
import { useTimer } from "use-timer";
import { cn } from "~/lib/utils";

export default function EmailVerification() {
  const { time, start, status } = useTimer({
    initialTime: 60 * 3,
    endTime: 0,
    timerType: "DECREMENTAL",
  });

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const emailVerificationToken = params.get("emailVerificationToken");

  const resendVerificationEmail = useMutation({
    mutationFn: fetchers.resendVerificationEmail,
  });

  const verifyEmail = useMutation<
    VerifyEmailResponse,
    ApiError,
    VerifyEmailPayload
  >({
    mutationFn: fetchers.verifyEmail,
    onSuccess: (data) => {
      console.log({ data });
      setAuthCookies(data);
      navigate("/dashboard", { replace: true });
    },
  });

  useEffect(() => {
    if (!emailVerificationToken) return;

    verifyEmail.mutate({ emailVerificationToken });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyEmail.mutate, emailVerificationToken]);

  const handleResendVerificationEmail = async () => {
    await resendVerificationEmail.mutateAsync();
    start();
  };

  const showApiError = verifyEmail.isError;
  const showUrlInvalidError = !emailVerificationToken;
  const hasError = showApiError || showUrlInvalidError;
  const showLoading =
    (verifyEmail.isPending || verifyEmail.isIdle) && !hasError;

  return (
    <div
      className={cn(
        "mt-[15dvh]",
        "space-y-8",
        "flex flex-col items-center justify-center",
      )}
    >
      <div className={cn("m-auto max-w-[500px]")}>
        {showLoading && (
          <div className="flex flex-col items-center gap-4">
            <div className={cn("h-8 w-8")}>
              <LoadingIndicator
                className={cn("h-full w-full", "border-link")}
              />
            </div>
            <h1 className="text-center text-2xl font-bold">
              Verifying your email...
            </h1>
          </div>
        )}
        {showApiError && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="whitespace-nowrap text-center text-2xl font-bold">
              <div>Email verification is invalid or expired.</div>
              <div>Please resend the email.</div>
            </h1>
            <Button className="mt-4" variant="outline">
              Resend Email
            </Button>
            <p className="mt-4 text-center text-muted-foreground">
              If you have not yet received an email, please check your Spam
              folder.
            </p>
          </div>
        )}
        {showUrlInvalidError && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-2xl font-bold">
              <div>
                Your email is not verified. Please check your email or resend.
              </div>
            </h1>
            <Button
              className="mt-4"
              variant="outline"
              disabled={status === "RUNNING"}
              onClick={handleResendVerificationEmail}
            >
              <div>
                {status === "RUNNING" ? (
                  <span className="ml-2">
                    You can resend in{" "}
                    <span className="tabular-nums">{time}</span> seconds
                  </span>
                ) : (
                  <span>Resend Email</span>
                )}
              </div>
            </Button>
            <p className="mt-4 text-center text-muted-foreground">
              If you have not yet received an email, please check your Spam
              folder or contact support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
