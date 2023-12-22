import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

export function FeedbackCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-2 border-b p-2 last:border-none"
    >
      <div className="flex justify-between">
        <Skeleton className="h-5 w-[55px]" />
        <Skeleton className="h-3 w-[65px]" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </motion.div>
  );
}