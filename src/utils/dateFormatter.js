import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formattedDate = (unFormattedDate) => {
  const timeZone = "Asia/Kathmandu";
  const zonedDate = toZonedTime(new Date(unFormattedDate), timeZone);
  return format(zonedDate, "yyyy-MM-dd");
};
