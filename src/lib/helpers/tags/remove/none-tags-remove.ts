import { tagsDeletionAlgorithm } from "./helpers/tags-deletion-algorithm";

export const noneTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns: string[] = [
        `${title} ${artist} audio`,
        `${artist} - ${title}`,
        `${artist} music`,
        `${title} ${artist}`,
        `${title} official audio`,
        `${artist} ${title} official audio`,
        `${artist} ${title} song`,
        `${artist} new song`,
        `${artist} ${title}`,
        `${title}`,
        `${artist}`,
      ];

      return patterns.map((pattern) => pattern.trim().toLowerCase());
    };

    const concreteLeastEfficientTags = generateConcreteLeastEfficientTags(artist, title);

    return tagsDeletionAlgorithm(concreteLeastEfficientTags, tags.toLowerCase());
  }

  if (features !== "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      let feats = features.split(",").map((feat) => feat.trim());

      const secondFeature = feats[1];
      const firstFeature = feats[0];

      if (feats.length === 1) {
        const patterns: string[] = [
          `${artist} ${firstFeature} ${title}`,
          `${firstFeature} ${title}`,
          `${artist} ${firstFeature}`,
          `${title} ${artist} audio`,
          `${artist} - ${title}`,
          `${artist} music`,
          `${title} ${artist}`,
          `${title} official audio`,
          `${artist} ${title} official audio`,
          `${artist} ${title} song`,
          `${artist} new song`,
          `${firstFeature}`,
          `${artist} ${title}`,
          `${title}`,
          `${artist}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 2) {
        const patterns: string[] = [
          `${artist} ${secondFeature} ${title}`,
          `${secondFeature} ${title}`,
          `${artist} ${secondFeature}`,
          `${artist} ${firstFeature} ${title}`,
          `${firstFeature} ${title}`,
          `${artist} ${firstFeature}`,
          `${title} ${artist} audio`,
          `${artist} - ${title}`,
          `${artist} music`,
          `${title} ${artist}`,
          `${title} official audio`,
          `${artist} ${title} official audio`,
          `${artist} ${title} song`,
          `${artist} new song`,
          `${secondFeature}`,
          `${firstFeature}`,
          `${artist} ${title}`,
          `${title}`,
          `${artist}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 3) {
        const thirdFeature = feats[2];

        const patterns: string[] = [
          `${artist} ${secondFeature} ${title}`,
          `${thirdFeature} ${title}`,
          `${artist} ${thirdFeature}`,
          `${artist} ${thirdFeature} ${title}`,
          `${secondFeature} ${title}`,
          `${artist} ${secondFeature}`,
          `${artist} ${firstFeature} ${title}`,
          `${firstFeature} ${title}`,
          `${artist} ${firstFeature}`,
          `${title} ${artist} audio`,
          `${artist} - ${title}`,
          `${artist} music`,
          `${title} ${artist}`,
          `${title} official audio`,
          `${artist} ${title} official audio`,
          `${artist} ${title} song`,
          `${artist} new song`,
          `${thirdFeature}`,
          `${secondFeature}`,
          `${firstFeature}`,
          `${artist} ${title}`,
          `${title}`,
          `${artist}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      }

      return [];
    };

    const concreteLeastEfficientTags = generateConcreteLeastEfficientTags(artist, title);

    return tagsDeletionAlgorithm(concreteLeastEfficientTags, tags.toLowerCase());
  }

  return "";
};
