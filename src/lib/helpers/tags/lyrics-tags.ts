export const lyricsTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist},${title} ${artist},lyrics`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeature},${firstFeature} ${title} lyrics,lyrics ${firstFeature} ${title},${firstFeature} lyrics`;

    // Second feature
    if (feats.length === 2) {
      const secondFeature = feats[1];
      tags += `,${secondFeature},${secondFeature} ${title} lyrics`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];
      tags += `,${thirdFeature},${thirdFeature} ${title} lyrics`;
    }
  }

  if (tiktok === "true") {
    tags += `,tiktok,${title} tiktok,trending tiktok,tiktok songs`;
  }

  return tags;
};
