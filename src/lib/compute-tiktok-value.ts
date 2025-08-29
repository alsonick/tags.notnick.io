export const computeTikTokValue = (tiktok: string): string => {
  switch (tiktok) {
    case "false":
      return "false";
    case "f":
      return "false";
    case "true":
      return "true";
    case "t":
      return "true";
    default:
      return "false";
  }
};
