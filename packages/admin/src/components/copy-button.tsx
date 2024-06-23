import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import { Button } from "./ui/button";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    try {
      await copy(value);
      setIsCopied(true);
    } catch (error) {
      setIsCopied(false);
    }
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
      <span className="sr-only">Copy</span>
    </Button>
  );
}
