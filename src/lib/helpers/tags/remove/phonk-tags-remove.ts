import { tagsDeletionAlgorithm } from "./helpers/tags-deletion-algorithm";

export const phonkTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns: string[] = [
        `${artist} ${title} funk`,
        `${title} ${artist} phonk`,
        `${artist} ${title} phonk`,
        `${artist} ${title}`,
        `${title} ${artist}`,
        `${title} phonk`,
        `${artist} phonk`,
        `brazilian phonk`,
        `${artist} funk`,
        `${title} funk`,
        `tiktok phonk`,
        `hard phonk`,
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
        const patterns: string[] = [
          `${artist} ${firstFeature} ${title}`,
          `${artist} ${title} funk`,
          `${title} ${artist} phonk`,
          `${artist} ${title} phonk`,
          `${firstFeature} ${title}`,
          `${artist} ${title}`,
          `${title} ${artist}`,
          `${firstFeature}`,
          `${title} phonk`,
          `${artist} phonk`,
          `brazilian phonk`,
          `${artist} funk`,
          `${title} funk`,
          `tiktok phonk`,
          `hard phonk`,
          `${artist}`,
          `${title}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 2) {
        const patterns: string[] = [
          `${title} ${secondFeature}`,
          `${secondFeature} ${title}`,
          `${secondFeature} ${title} phonk`,
          `${artist} ${firstFeature} ${title}`,
          `${artist} ${secondFeature}`,
          `${artist} ${title} funk`,
          `${title} ${artist} phonk`,
          `${artist} ${title} phonk`,
          `${firstFeature} ${title}`,
          `${artist} ${title}`,
          `${title} ${artist}`,
          `${secondFeature}`,
          `${firstFeature}`,
          `${title} phonk`,
          `${artist} phonk`,
          `brazilian phonk`,
          `${artist} funk`,
          `${title} funk`,
          `tiktok phonk`,
          `hard phonk`,
          `${artist}`,
          `${title}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 3) {
        const thirdFeature = feats[2];

        const patterns: string[] = [
          `${thirdFeature} ${title} phonk`,
          `${thirdFeature} ${title}`,
          `${title} ${thirdFeature}`,
          `${artist} ${thirdFeature}`,
          `${title} ${secondFeature}`,
          `${secondFeature} ${title}`,
          `${secondFeature} ${title} phonk`,
          `${artist} ${firstFeature} ${title}`,
          `${artist} ${secondFeature}`,
          `${artist} ${title} funk`,
          `${title} ${artist} phonk`,
          `${artist} ${title} phonk`,
          `${firstFeature} ${title}`,
          `${artist} ${title}`,
          `${title} ${artist}`,
          `${thirdFeature}`,
          `${secondFeature}`,
          `${firstFeature}`,
          `${title} phonk`,
          `${artist} phonk`,
          `brazilian phonk`,
          `${artist} funk`,
          `${title} funk`,
          `tiktok phonk`,
          `hard phonk`,
          `${artist}`,
          `${title}`,
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
