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
      }

      return [];
    };

    const concreteLeastEfficientTags = generateConcreteLeastEfficientTags(artist, title);

    return tagsDeletionAlgorithm(concreteLeastEfficientTags, tags.toLowerCase());
  }

  return "";
};
