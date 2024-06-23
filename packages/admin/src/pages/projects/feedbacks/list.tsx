import { FeedbackSider } from "@/components/feedback-sider";
import { FeedbackList } from "@/components/feedback-list";
import { FeedbackProvider } from "@/components/feedback-provider";

export const PageProjectFeedbackList = () => {
  return (
    <FeedbackProvider>
      <div className="bg-background">
        <div className="container">
          <div className="flex min-h-[calc(100vh-105px)] flex-wrap gap-8 pt-8 md:flex-nowrap">
            <FeedbackSider />
            <h2 className="w-full text-center text-3xl tracking-wide md:hidden">
              Feedback
            </h2>
            <FeedbackList />
          </div>
        </div>
      </div>
    </FeedbackProvider>
  );
};
