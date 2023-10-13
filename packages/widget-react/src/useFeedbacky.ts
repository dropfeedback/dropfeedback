import { useEffect } from "react";

export const useFeedbacky = () => {
  useEffect(() => {
    // @ts-ignore
    if (window.__feedbacky_injected__) return;
    // @ts-ignore
    window.__feedbacky_injected__ = true;

    const script = document.createElement("script");
    script.src = `https://feedbacky-widget.vercel.app/feedbacky-widget.js`;
    script.defer = true;

    const onScriptError = () => script.remove();
    script.addEventListener("error", onScriptError);

    document.body.appendChild(script);
  }, []);
};
