import { countTagsLength } from "@/lib/count-tags-length";

export const bassBoostedTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns = [""];

      return patterns.map((pattern) => pattern.trim().toLowerCase());
    };

    const concreteLeastEfficientTags = generateConcreteLeastEfficientTags(artist, title);
  }

  if (features !== "none") {
  }

  return "";
};
