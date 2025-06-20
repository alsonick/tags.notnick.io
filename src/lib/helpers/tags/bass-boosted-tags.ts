export const bassBoostedTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${title} bass boosted,${title} bass boosted ${artist},${title} ${artist},${title} ${artist} bass boosted,${artist} ${title} bass boosted,${artist} ${title},${artist} - ${title},${artist} - ${title} bass boosted,${title} ${artist} bass boost,${artist} bass boosted,${title} bass boost,bass boost,bass boosted,bass boosted car playlist, bass boost car playlist`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeature},${firstFeature} ${title} bass boosted`;

    // Second feature
    if (feats.length === 2) {
      const secondFeature = feats[1];
      tags += `,${secondFeature},${secondFeature} ${title} bass boosted`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];
      tags += `,${thirdFeature},${thirdFeature} ${title} bass boosted`;
    }
  }

  // Tiktok
  if (tiktok === "true") {
    tags += `,tiktok,${title} tiktok,trending tiktok,tiktok songs`;
  }

  return tags;
};
