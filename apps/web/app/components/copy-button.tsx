import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useCopyToClipboard } from "~/lib/hooks/useCopyToClipboard";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    copy(value);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      type="button"
      onClick={handleClick}
    >
      {isCopied ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <CheckIcon />
        </motion.div>
      ) : (
        <CopyIcon />
      )}
    </Button>
  );
}
