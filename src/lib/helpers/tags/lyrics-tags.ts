export const lyricsTags = (
  artist: string,
  title: string,
  features: string,
  tiktok: string
): string => {
  // Tags
  let tags = `${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyrics ${artist},${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist}, ${title} ${artist},lyrics`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feat
  const firstFeat = feats[0];

  // Features
  if (
    features.length &&
    (tiktok === "false" || tiktok === "" || tiktok !== "true")
  ) {
    tags += `,${firstFeat} ${title} lyrics,lyrics ${firstFeat} ${title},${firstFeat} lyrics`;

    if (feats.length >= 2) {
      // Second feat
      const secondFeat = feats[1];
      tags += `,${artist} ${secondFeat} ${title} lyrics,${secondFeat} ${title} lyrics,lyrics ${secondFeat} ${title},${secondFeat} lyrics,lyrics ${secondFeat}`;
    }
  }

  if (tiktok === "true") {
    tags += `,slowed tiktok songs`;
  }

  return tags;
};
