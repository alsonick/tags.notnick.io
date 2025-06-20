import { tagsDeletionAlgorithm } from "./helpers/tags-deletion-algorithm";

export const bassBoostedTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns = [
        `${artist} - ${title} bass boosted`,
        `${title} ${artist} bass boost`,
        `${artist} - ${title}`,
        `${title} bass boosted ${artist}`,
        `${title} ${artist} bass boosted`,
        `${title} bass boosted`,
        `${artist} ${title} bass boosted`,
        `${artist} ${title}`,
        `${artist} bass boosted`,
        `${title} bass boost`,
        `${title} ${artist}`,
        `bass boost`,
        `bass boosted`,
        `bass boosted car playlist`,
        `bass boost car playlist`,
        `${artist}`,
        `${title}`,
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
        const patterns = [
          `${artist} - ${title} bass boosted`,
          `${artist} - ${title}`,
          `${firstFeature} ${title} bass boosted`,
          `${title} ${artist} bass boost`,
          `${title} bass boosted ${artist}`,
          `${title} ${artist} bass boosted`,
          `${title} bass boosted`,
          `${artist} ${title} bass boosted`,
          `${artist} ${title}`,
          `${artist} bass boosted`,
          `${title} bass boost`,
          `${title} ${artist}`,
          `bass boost`,
          `bass boosted`,
          `bass boosted car playlist`,
          `bass boost car playlist`,
          `${artist}`,
          `${title}`,
          `${firstFeature}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 2) {
        const patterns = [
          `${artist} - ${title} bass boosted`,
          `${artist} - ${title}`,
          `${secondFeature} ${title} bass boosted`,
          `${firstFeature} ${title} bass boosted`,
          `${title} ${artist} bass boost`,
          `${title} bass boosted ${artist}`,
          `${title} ${artist} bass boosted`,
          `${title} bass boosted`,
          `${artist} ${title} bass boosted`,
          `${artist} ${title}`,
          `${artist} bass boosted`,
          `${title} bass boost`,
          `${title} ${artist}`,
          `bass boost`,
          `bass boosted`,
          `bass boosted car playlist`,
          `bass boost car playlist`,
          `${artist}`,
          `${title}`,
          `${secondFeature}`,
          `${firstFeature}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 3) {
        const thirdFeature = feats[2];

        const patterns = [
          `${artist} - ${title} bass boosted`,
          `${artist} - ${title}`,
          `${thirdFeature} ${title} bass boosted`,
          `${secondFeature} ${title} bass boosted`,
          `${firstFeature} ${title} bass boosted`,
          `${title} ${artist} bass boost`,
          `${title} bass boosted ${artist}`,
          `${title} ${artist} bass boosted`,
          `${title} bass boosted`,
          `${artist} ${title} bass boosted`,
          `${artist} ${title}`,
          `${artist} bass boosted`,
          `${title} bass boost`,
          `${title} ${artist}`,
          `bass boost`,
          `bass boosted`,
          `bass boosted car playlist`,
          `bass boost car playlist`,
          `${artist}`,
          `${title}`,
          `${thirdFeature}`,
          `${secondFeature}`,
          `${firstFeature}`,
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
