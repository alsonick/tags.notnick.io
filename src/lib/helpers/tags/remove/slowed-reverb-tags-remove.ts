import { tagsDeletionAlgorithm } from "./helpers/tags-deletion-algorithm";

export const slowedReverbTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns = [
        `${artist} - ${title} slowed reverb`,
        `${artist} - ${title}`,
        `${artist} - ${title} slowed`,
        `${artist} ${title} slowed to perfection`,
        `slowed and reverb songs`,
        `${title} slowed to perfection`,
        `${artist} ${title}`,
        `${artist} ${title} slowed and reverb`,
        `${artist} ${title} slowed reverb`,
        `${artist} ${title} slowed`,
        `${title} ${artist}`,
        `${title} slowed`,
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
          `${artist} ${firstFeature} ${title} slowed`,
          `${firstFeature} ${title} slowed`,
          `${artist} - ${title} slowed reverb`,
          `${artist} - ${title}`,
          `${artist} - ${title} slowed`,
          `${artist} ${title} slowed to perfection`,
          `slowed and reverb songs`,
          `${title} slowed to perfection`,
          `${artist} ${title}`,
          `${artist} ${title} slowed and reverb`,
          `${artist} ${title} slowed reverb`,
          `${artist} ${title} slowed`,
          `${title} ${artist}`,
          `${firstFeature}`,
          `${title} slowed`,
          `${artist}`,
          `${title}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 2) {
        const patterns = [
          `${artist} ${firstFeature} ${title} slowed`,
          `${firstFeature} ${title} slowed`,
          `${artist} - ${title} slowed reverb`,
          `${artist} - ${title}`,
          `${artist} - ${title} slowed`,
          `${artist} ${title} slowed to perfection`,
          `slowed and reverb songs`,
          `${title} slowed to perfection`,
          `${artist} ${title}`,
          `${artist} ${title} slowed and reverb`,
          `${artist} ${title} slowed reverb`,
          `${artist} ${title} slowed`,
          `${title} ${artist}`,
          `${firstFeature}`,
          `${secondFeature}`,
          `${title} slowed`,
          `${artist}`,
          `${title}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 3) {
        const thirdFeature = feats[2];

        const patterns = [
          `${artist} ${firstFeature} ${title} slowed`,
          `${firstFeature} ${title} slowed`,
          `${artist} - ${title} slowed reverb`,
          `${artist} - ${title}`,
          `${artist} - ${title} slowed`,
          `${artist} ${title} slowed to perfection`,
          `slowed and reverb songs`,
          `${title} slowed to perfection`,
          `${artist} ${title}`,
          `${artist} ${title} slowed and reverb`,
          `${artist} ${title} slowed reverb`,
          `${artist} ${title} slowed`,
          `${title} ${artist}`,
          `${firstFeature}`,
          `${secondFeature}`,
          `,${thirdFeature}`,
          `${title} slowed`,
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
