export const testoTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title} testo,${artist} ${title},${title} ${artist},${title} testo,testo ${title},testo ${title} ${artist},${artist} testo,${artist} testo ${title},${title} testo ${artist},testo ${artist},${artist} - ${title},${artist} - ${title} testo,testo`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeature} ${title},${artist} ${firstFeature} ${title},${firstFeature} ${title} testo,${title} ${firstFeature},${artist} ${firstFeature},${firstFeature} ${artist},${firstFeature}`;

    // Second feature
    if (feats.length === 2) {
      const secondFeature = feats[1];

      tags += `,${secondFeature},${secondFeature} ${title} testo,${secondFeature} ${title},${artist} ${secondFeature},${title} ${secondFeature}`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];

      tags += `,${thirdFeature},${thirdFeature} ${title} testo,${thirdFeature} ${title},${artist} ${thirdFeature},${title} ${thirdFeature}`;
    }
  }

  if (tiktok === "true") {
    tags += `,${title} tiktok,${artist} tiktok`;
  }

  return tags;
};
