import { tagsDeletionAlgorithm } from "./helpers/tags-deletion-algorithm";

export const letraTagsRemove = (title: string, artist: string, features: string, tiktok: string, tags: string) => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns: string[] = [
        `${artist} - ${title}`,
        `${artist} - ${title}`,
        `letra ${title} ${artist}`,
        `${artist} letra ${title}`,
        `${title} ${artist}`,
        `letra ${title}`,
        `${artist} ${title}`,
        `${title} letra`,
        `${artist} letra`,
        `${title} letra ${artist}`,
        `${artist} ${title} letra`,
        `letra ${artist}`,
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
          `${artist} - ${title}`,
          `${artist} - ${title}`,
          `letra ${title} ${artist}`,
          `${artist} ${firstFeature} ${title}`,
          `${artist} letra ${title}`,
          `${title} ${artist}`,
          `letra ${title}`,
          `${artist} ${title}`,
          `${title} letra`,
          `${artist} letra`,
          `${title} letra ${artist}`,
          `${artist} ${title} letra`,
          `letra ${artist}`,
          `${artist} ${firstFeature}`,
          `${firstFeature} ${title}`,
          `${firstFeature} ${title} letra`,
          `${firstFeature} ${artist}`,
          `${title} ${firstFeature}`,
          `${firstFeature}`,
          `${title}`,
          `${artist}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 2) {
        const patterns: string[] = [
          `${artist} - ${title}`,
          `${artist} - ${title}`,
          `letra ${title} ${artist}`,
          `${secondFeature} ${title}`,
          `${artist} ${firstFeature} ${title}`,
          `${artist} letra ${title}`,
          `${title} ${artist}`,
          `letra ${title}`,
          `${artist} ${title}`,
          `${title} letra`,
          `${artist} letra`,
          `${title} letra ${artist}`,
          `${artist} ${title} letra`,
          `letra ${artist}`,
          `${secondFeature} ${title} letra`,
          `${artist} ${secondFeature}`,
          `${title} ${secondFeature}`,
          `${artist} ${firstFeature}`,
          `${firstFeature} ${title}`,
          `${firstFeature} ${title} letra`,
          `${firstFeature} ${artist}`,
          `${title} ${firstFeature}`,
          `${secondFeature}`,
          `${firstFeature}`,
          `${title}`,
          `${artist}`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 3) {
        const thirdFeature = feats[2];

        const patterns: string[] = [
          `${artist} - ${title}`,
          `${artist} - ${title}`,
          `letra ${title} ${artist}`,
          `${secondFeature} ${title}`,
          `${thirdFeature} ${title} letra`,
          `${artist} ${firstFeature} ${title}`,
          `${artist} letra ${title}`,
          `${title} ${artist}`,
          `letra ${title}`,
          `${artist} ${title}`,
          `${title} letra`,
          `${artist} letra`,
          `${title} letra ${artist}`,
          `${artist} ${title} letra`,
          `letra ${artist}`,
          `${thirdFeature} ${title}`,
          `${artist} ${thirdFeature}`,
          `${title} ${thirdFeature}`,
          `${secondFeature} ${title} letra`,
          `${artist} ${secondFeature}`,
          `${title} ${secondFeature}`,
          `${artist} ${firstFeature}`,
          `${firstFeature} ${title}`,
          `${firstFeature} ${title} letra`,
          `${firstFeature} ${artist}`,
          `${title} ${firstFeature}`,
          `${thirdFeature}`,
          `${secondFeature}`,
          `${firstFeature}`,
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
