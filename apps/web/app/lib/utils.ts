import * as dateFns from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRelativeTime = (date: string) => {
  const now = new Date();
  const then = new Date(date);

  const diff = dateFns.differenceInDays(now, then);
  const isToday = dateFns.isToday(then);

  if (diff === 0 && isToday)
    return `${dateFns.format(
      then,
      "HH:mm",
    )} (${dateFns.formatDistanceToNowStrict(then, { addSuffix: true })})`;

  if (diff === 0)
    return `${dateFns.format(
      then,
      "PP HH:mm",
    )} (${dateFns.formatDistanceToNowStrict(then, { addSuffix: true })})`;
  return `${dateFns.format(then, "PP HH:mm")}`;
};

export const getNameInitials = (name?: string, count = 2) => {
  if (!name) return "";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const filtered = initials.replace(/[^a-zA-Z]/g, "");
  return filtered.slice(0, count).toUpperCase();
};
