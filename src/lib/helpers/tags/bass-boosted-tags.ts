export const bassBoostedTags = (
  artist: string,
  title: string,
  features: string,
  tiktok: string
): string => {
  // Tags
  let tags = `${artist},${title},${title} bass boosted,${title} bass boosted ${artist},${title} ${artist},${title} ${artist} bass boosted,${artist} ${title} bass boosted,${artist} ${title},${artist} - ${title},${artist} - ${title} bass boosted,${title} ${artist} bass boost,${artist} bass boosted,${title} bass boost,bass boost,bass boosted,bass boosted car playlist, bass boost car playlist`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feat
  const firstFeat = feats[0];

  // Features
  if (
    features.length &&
    (tiktok === "false" || tiktok === "" || tiktok !== "true")
  ) {
    tags += `${firstFeat} ${title} bass boosted,${title} ${firstFeat} bass boosted, ${firstFeat} ${title} bass,${title} ${firstFeat} bass, ${firstFeat} bass`;
    if (features.length >= 2) {
      // Second feat
      const secondFeat = feats[1];
    }
  }

  // Tiktok
  if (tiktok === "true") {
  }

  return tags;
};
