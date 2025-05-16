export const slowedReverbTags = (
  artist: string,
  title: string,
  features: string,
  tiktok: string
): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title},${artist} ${title} slowed,${artist} ${title} slowed reverb,${artist} ${title} slowed to perfection,${title} ${artist},${title} slowed,${artist} - ${title},${artist} - ${title} slowed,${artist} - ${title} slowed reverb,${title} slowed to perfection,${artist} ${title} slowed and reverb,slowed and reverb songs`;

  if (
    features !== "none" &&
    (tiktok === "false" || tiktok === "" || tiktok !== "true")
  ) {
    let feats = features.split(",").map((feat) => feat.trim());
    const firstFeat = feats[0];

    tags += `,${firstFeat} ${title},${firstFeat} ${title} slowed,${artist} ${firstFeat} ${title} slowed,${firstFeat} ${title} slowed reverb,${firstFeat} slowed`;
    if (features.length >= 2) {
      // Second feat
      const secondFeat = feats[1];
    }
  }

  if (tiktok === "true") {
    tags += `,slowed tiktok songs`;
  }

  return tags;
};
