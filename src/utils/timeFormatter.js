import { formatRelative } from "date-fns";
export const epochToReadable = (ts) => {
  //converting seconds to milliseconds * 1000
  return formatRelative(new Date(ts * 1000), new Date());
};
