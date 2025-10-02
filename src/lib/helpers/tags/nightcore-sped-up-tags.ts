export const nightcoreSpedUpTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${title} nightcore,${title} sped up,${title} sped up ${artist},${artist} ${title},${artist} ${title} sped up,${artist} nightcore,${artist} sped up,nightcore`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeature},${artist} ${firstFeature},${firstFeature} ${title},title ${firstFeature}`;

    // Second feature
    if (feats.length === 2) {
      const secondFeature = feats[1];

      tags += `,${secondFeature},${artist} ${secondFeature},${secondFeature} ${title},title ${secondFeature}`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];

      tags += `,${thirdFeature},${artist} ${thirdFeature},${thirdFeature} ${title},title ${thirdFeature}`;
    }
  }

  if (tiktok === "true") {
    tags += `${artist} ${title} sped up tiktok remix,${title} sped up tiktok version`;
  }

  return tags;
};
