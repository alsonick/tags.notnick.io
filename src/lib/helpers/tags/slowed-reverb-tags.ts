export const slowedReverbTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title},${artist} ${title} slowed,${artist} ${title} slowed reverb,${artist} ${title} slowed to perfection,${title} ${artist},${title} slowed,${artist} - ${title},${artist} - ${title} slowed,${artist} - ${title} slowed reverb,${title} slowed to perfection,${artist} ${title} slowed and reverb,slowed and reverb songs`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeat = feats[0];

  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeat} ${title} slowed,${artist} ${firstFeat} ${title} slowed,${firstFeat}`;

    // Second Feature
    if (features.length === 2) {
      const secondFeat = feats[1];
      tags += `,${secondFeat}`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];
      tags += `,${thirdFeature}`;
    }
  }

  if (tiktok === "true") {
    tags += `,slowed tiktok songs`;
  }

  return tags;
};
