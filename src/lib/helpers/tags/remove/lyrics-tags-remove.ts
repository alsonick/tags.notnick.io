import { tagsDeletionAlgorithm } from "./helpers/tags-deletion-algorithm";

export const lyricsTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  if (features === "none") {
    const generateConcreteLeastEfficientTags = (artist: string, title: string) => {
      const patterns = [
        `lyrics ${artist}`,
        `lyrics ${title}`,
        `${artist} lyrics`,
        `${artist} lyrics ${title}`,
        `${title} lyric video`,
        `${title} ${artist} lyrics`,
        `${title} lyrics`,
        `${artist} ${title}`,
        `${title} ${artist}`,
        `${title}`,
        `${artist}`,
        `${artist} ${title} lyrics`,
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
          `lyrics ${firstFeature} ${title}`,
          `${firstFeature} lyrics`,
          `lyrics ${artist}`,
          `${artist} lyrics`,
          `${artist} lyrics ${title}`,
          `${title} lyric video`,
          `lyrics ${title}`,
          `${title} ${artist} lyrics`,
          `${title} lyrics`,
          `${artist} ${title}`,
          `${title} ${artist}`,
          `${title}`,
          `${artist}`,
          `${artist} ${title} lyrics`,
          `${firstFeature}`,
          `${firstFeature} ${title} lyrics`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 2) {
        const patterns = [
          `lyrics ${firstFeature} ${title}`,
          `${firstFeature} lyrics`,
          `lyrics ${artist}`,
          `${artist} lyrics`,
          `${artist} lyrics ${title}`,
          `${title} lyric video`,
          `lyrics ${title}`,
          `${title} ${artist} lyrics`,
          `${title} lyrics`,
          `${artist} ${title}`,
          `${title} ${artist}`,
          `${title}`,
          `${artist}`,
          `${artist} ${title} lyrics`,
          `${firstFeature}`,
          `${secondFeature}`,
          `${secondFeature} ${title} lyrics`,
          `${firstFeature} ${title} lyrics`,
        ];

        return patterns.map((pattern) => pattern.trim().toLowerCase());
      } else if (feats.length === 3) {
        const thirdFeature = feats[2];

        const patterns = [
          `${thirdFeature} ${title} lyrics`,
          `lyrics ${firstFeature} ${title}`,
          `${firstFeature} ${title} lyrics`,
          `${firstFeature} lyrics`,
          `lyrics ${artist}`,
          `${artist} lyrics`,
          `${artist} lyrics ${title}`,
          `${title} lyric video`,
          `lyrics ${title}`,
          `${title} ${artist} lyrics`,
          `${title} lyrics`,
          `${artist} ${title}`,
          `${title} ${artist}`,
          `${title}`,
          `${artist}`,
          `${artist} ${title} lyrics`,
          `${firstFeature}`,
          `${secondFeature}`,
          `${thirdFeature}`,
          `${secondFeature} ${title} lyrics`,
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
