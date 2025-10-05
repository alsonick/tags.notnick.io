import { tagsDeletionAlgorithm } from "./helpers/tags-deletion-algorithm";

export const nightcoreSpedUpTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns: string[] = [
        `${title} sped up ${artist}`,
        `${title} sped up`,
        `${artist} ${title}`,
        `${title} nightcore`,
        `${artist} ${title} sped up`,
        `${artist} nightcore`,
        `${artist} sped up`,
        `${artist}`,
        `${title}`,
        `nightcore`,
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
          `title ${firstFeature}`,
          `${firstFeature} ${title}`,
          `${artist} ${firstFeature}`,
          `${title} sped up ${artist}`,
          `${title} sped up`,
          `${artist} ${title}`,
          `${title} nightcore`,
          `${artist} ${title} sped up`,
          `${artist} nightcore`,
          `${artist} sped up`,
          `${firstFeature}`,
          `${artist}`,
          `${title}`,
          `nightcore`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 2) {
        const patterns: string[] = [
          `title ${secondFeature}`,
          `${secondFeature} ${title}`,
          `${artist} ${secondFeature}`,
          `title ${firstFeature}`,
          `${firstFeature} ${title}`,
          `${artist} ${firstFeature}`,
          `${title} sped up ${artist}`,
          `${title} sped up`,
          `${artist} ${title}`,
          `${title} nightcore`,
          `${artist} ${title} sped up`,
          `${artist} nightcore`,
          `${artist} sped up`,
          `${secondFeature}`,
          `${firstFeature}`,
          `${artist}`,
          `${title}`,
          `nightcore`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 3) {
        const thirdFeature = feats[2];

        const patterns: string[] = [
          `title ${thirdFeature}`,
          `${thirdFeature} ${title}`,
          `${artist} ${thirdFeature}`,
          `title ${secondFeature}`,
          `${secondFeature} ${title}`,
          `${artist} ${secondFeature}`,
          `title ${firstFeature}`,
          `${firstFeature} ${title}`,
          `${artist} ${firstFeature}`,
          `${title} sped up ${artist}`,
          `${title} sped up`,
          `${artist} ${title}`,
          `${title} nightcore`,
          `${artist} ${title} sped up`,
          `${artist} nightcore`,
          `${artist} sped up`,
          `${thirdFeature}`,
          `${secondFeature}`,
          `${firstFeature}`,
          `${artist}`,
          `${title}`,
          `nightcore`,
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
