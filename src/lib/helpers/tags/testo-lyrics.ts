export const testoTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title} testo,${artist} ${title},${title} ${artist},${title} testo,testo ${title},testo ${title} ${artist},${artist} testo,${artist} testo ${title},${title} testo ${artist},testo ${artist},${artist} - ${title},${artist} - ${title} testo,testo`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feat
  const firstFeat = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeat} ${title},${artist} ${firstFeat} ${title},${firstFeat} ${title} testo,${title} ${firstFeat},${artist} ${firstFeat},${firstFeat} ${artist},${firstFeat}`;
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
