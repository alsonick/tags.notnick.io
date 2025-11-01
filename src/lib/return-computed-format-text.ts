import { FORMAT_LIST } from "./format-list";

export const returnComputedFormatText = (format: string): string => {
  for (var i = 0; i < FORMAT_LIST.length; i++) {
    const slug = FORMAT_LIST[i].slug;
    if (format.toLowerCase() === slug) {
      return FORMAT_LIST[i].name;
    }
  }
  return "";
};
