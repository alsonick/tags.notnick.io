export const lyricsTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},${artist} lyrics ${title},${title} lyric video,${artist} lyrics,lyrics ${artist},${title},${artist},${title} ${artist},lyrics ${title} ${artist},lyrics ${artist} ${title},lyrics`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeature},${firstFeature} ${title} lyrics,lyrics ${firstFeature} ${title},${firstFeature} lyrics,${firstFeature} ${title},${artist} ${firstFeature},${title} ${firstFeature}`;

    // Second feature
    if (feats.length === 2) {
      const secondFeature = feats[1];

      tags += `,${secondFeature},${secondFeature} ${title} lyrics,${secondFeature} ${title},${artist} ${secondFeature},${title} ${secondFeature}`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];

      tags += `,${thirdFeature},${thirdFeature} ${title} lyrics,${thirdFeature} ${title},${artist} ${thirdFeature},${title} ${thirdFeature}`;
    }
  }

  if (tiktok === "true") {
    tags += `,tiktok,${title} tiktok,trending tiktok,tiktok songs`;
  }

  return tags;
};
