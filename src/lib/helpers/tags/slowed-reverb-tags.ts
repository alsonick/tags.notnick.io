export const slowedReverbTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title},${artist} ${title} slowed,${artist} ${title} slowed reverb,${artist} ${title} slowed to perfection,${title} ${artist},${title} slowed,${artist} - ${title},${artist} - ${title} slowed,${artist} - ${title} slowed reverb,${title} slowed to perfection,${artist} ${title} slowed and reverb,slowed and reverb songs`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeature} ${title} slowed,${artist} ${firstFeature} ${title} slowed,${firstFeature}`;

    // Second Feature
    if (features.length === 2) {
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
    tags += `,slowed tiktok songs,${title} slowed down tiktok version`;
  }

  return tags;
};
