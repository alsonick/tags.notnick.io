export const letraTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title} letra,${artist} ${title},${title} ${artist},${title} letra,letra ${title},letra ${title} ${artist},${artist} letra,${artist} letra ${title},${title} letra ${artist},letra ${artist},${artist} - ${title},${artist} - ${title} letra,letra,latin,latin music`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feat
  const firstFeat = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeat} ${title},${artist} ${firstFeat} ${title},${firstFeat} ${title} letra,${title} ${firstFeat},${artist} ${firstFeat},${firstFeat} ${artist},${firstFeat}`;
    if (features.length >= 2) {
      // Second feat
      const secondFeat = feats[1];
    }
  }

  if (tiktok === "true") {
    tags += `,${title} tiktok,${artist} tiktok`;
  }

  return tags;
};
