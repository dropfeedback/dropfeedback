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
  if (diff === 0) {
    return dateFns.formatDistanceToNow(then, { addSuffix: true });
  } else if (diff === 1) {
    return `yesterday ${dateFns.format(then, "HH:mm")}`;
  } else {
    return dateFns.format(then, "dd.mm.yyyy");
  }
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
