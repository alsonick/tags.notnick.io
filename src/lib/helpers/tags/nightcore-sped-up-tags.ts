export const nightcoreSpedUpTags = (
  artist: string,
  title: string,
  features: string,
  tiktok: string
): string => {
  // Tags
  let tags = `${artist},${title},${title} nightcore,${title} sped up,${title} sped up ${artist},${artist} ${title},${artist} ${title} sped up,${artist} nightcore,${artist} sped up,nightcore`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feat
  const firstFeat = feats[0];

  // Features
  if (
    features.length &&
    (tiktok === "false" || tiktok === "" || tiktok !== "true")
  ) {
    if (features.length >= 2) {
      // Second feat
      const secondFeat = feats[1];
    }
  }

  if (tiktok === "true") {
    tags += `${artist} ${title} sped up tiktok remix,${title} sped up tiktok version`;
  }

  return tags;
};
