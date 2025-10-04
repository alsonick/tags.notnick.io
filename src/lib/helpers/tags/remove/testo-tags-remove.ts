import { tagsDeletionAlgorithm } from "./helpers/tags-deletion-algorithm";

export const testoTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns: string[] = [
        `testo ${artist}`,
        `testo ${title} ${artist}`,
        `${artist} - ${title} testo`,
        `${artist} - ${title}`,
        `${artist} testo`,
        `testo ${title}`,
        `${artist} ${title} testo`,
        `${artist} ${title}`,
        `${title} ${artist}`,
        `${title} testo`,
        `${title} testo ${artist}`,
        `${artist} testo ${title}`,
        `${artist}`,
        `${title}`,
        `testo`,
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
          `testo ${artist}`,
          `testo ${title} ${artist}`,
          `${firstFeature} ${title} testo`,
          `${artist} - ${title} testo`,
          `${artist} ${firstFeature} ${title}`,
          `${artist} - ${title}`,
          `${artist} testo`,
          `testo ${title}`,
          `${artist} ${title} testo`,
          `${artist} ${title}`,
          `${title} ${artist}`,
          `${title} testo`,
          `${title} testo ${artist}`,
          `${artist} testo ${title}`,
          `${artist}`,
          `${title}`,
          `testo`,
          `${firstFeature} ${title}`,
          `${title} ${firstFeature}`,
          `${artist} ${firstFeature}`,
          `${firstFeature} ${artist}`,
          `${firstFeature}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 2) {
        const patterns: string[] = [
          `testo ${artist}`,
          `${secondFeature} ${title} testo`,
          `testo ${title} ${artist}`,
          `${firstFeature} ${title} testo`,
          `${artist} - ${title} testo`,
          `${artist} ${firstFeature} ${title}`,
          `${artist} - ${title}`,
          `testo ${title}`,
          `${artist} ${title} testo`,
          `${secondFeature} ${title}`,
          `${artist} ${secondFeature}`,
          `${title} ${secondFeature}`,
          `${title} testo ${artist}`,
          `${artist} testo ${title}`,
          `${title} ${artist}`,
          `${artist} ${title}`,
          `${artist} testo`,
          `${title} testo`,
          `${artist}`,
          `${title}`,
          `testo`,
          `${firstFeature} ${title}`,
          `${title} ${firstFeature}`,
          `${artist} ${firstFeature}`,
          `${firstFeature} ${artist}`,
          `${secondFeature}`,
          `${firstFeature}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 3) {
        const thirdFeature = feats[2];

        const patterns: string[] = [
          `testo ${artist}`,
          `${secondFeature} ${title} testo`,
          `testo ${title} ${artist}`,
          `${firstFeature} ${title} testo`,
          `${artist} - ${title} testo`,
          `${artist} ${firstFeature} ${title}`,
          `${thirdFeature} ${title} testo`,
          `${artist} - ${title}`,
          `testo ${title}`,
          `${artist} ${title} testo`,
          `${secondFeature} ${title}`,
          `${artist} ${secondFeature}`,
          `${title} ${secondFeature}`,
          `${thirdFeature} ${title}`,
          `${artist} ${thirdFeature}`,
          `${title} ${thirdFeature}`,
          `${title} testo ${artist}`,
          `${artist} testo ${title}`,
          `${title} ${artist}`,
          `${artist} ${title}`,
          `${artist} testo`,
          `${title} testo`,
          `${artist}`,
          `${title}`,
          `testo`,
          `${firstFeature} ${title}`,
          `${title} ${firstFeature}`,
          `${artist} ${firstFeature}`,
          `${firstFeature} ${artist}`,
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
