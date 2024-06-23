import { FeedbackDetailHeader } from "@/components/feedback-detail-header";
import { FeedbackDetailContent } from "@/components/feedback-detail-content";

export const PageProjectFeedbackDetail = () => {
  return (
    <div className="bg-background">
      <div className="container">
        <div className="mb-8 flex min-h-[calc(100vh-105px)] flex-col gap-4 pt-4">
          <FeedbackDetailHeader />
          <FeedbackDetailContent />
        </div>
      </div>
    </div>
  );
};
