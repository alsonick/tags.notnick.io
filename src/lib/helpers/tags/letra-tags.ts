export const letraTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title} letra,${artist} ${title},${title} ${artist},${title} letra,letra ${title},letra ${title} ${artist},${artist} letra,${artist} letra ${title},${title} letra ${artist},letra ${artist},${artist} - ${title},${artist} - ${title}`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeature} ${title},${artist} ${firstFeature} ${title},${firstFeature} ${title} letra,${title} ${firstFeature},${artist} ${firstFeature},${firstFeature} ${artist},${firstFeature}`;

    if (feats.length === 2) {
      // Second feat
      const secondFeature = feats[1];

      tags += `,${secondFeature},${secondFeature} ${title} letra,${secondFeature} ${title},${artist} ${secondFeature},${title} ${secondFeature}`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];

      tags += `,${thirdFeature},${thirdFeature} ${title} letra,${thirdFeature} ${title},${artist} ${thirdFeature},${title} ${thirdFeature}`;
    }
  }

  if (tiktok === "true") {
    tags += `,${title} tiktok,${artist} tiktok,latin tiktok`;
  }

  return tags;
};
