export const phonkTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title},${title} ${artist},${title} phonk,${artist} ${title} phonk,${title} ${artist} phonk,${artist} phonk,brazilian phonk,tiktok phonk,hard phonk,${title} funk,${artist} funk,${artist} ${title} funk`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeature},${firstFeature} ${title},${artist} ${firstFeature} ${title}`;

    // Second feature
    if (feats.length === 2) {
      const secondFeature = feats[1];

      tags += `,${secondFeature},${secondFeature} ${title} phonk,${secondFeature} ${title},${artist} ${secondFeature},${title} ${secondFeature}`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];

      tags += `,${thirdFeature},${thirdFeature} ${title} phonk,${thirdFeature} ${title},${artist} ${thirdFeature},${title} ${thirdFeature}`;
    }
  }

  if (tiktok === "true") {
    tags += `,tiktok,${title} tiktok,trending tiktok,tiktok songs,phonk tiktok,trending phonk`;
  }

  return tags;
};
