export const phonkTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist},${title},${artist} ${title},${title} ${artist},${title} phonk,${artist} ${title} phonk,${title} ${artist} phonk,${artist} phonk,brazilian phonk,funk,new phonk,tiktok phonk,hard phonk,${title} funk,${artist} funk,${artist} ${title} funk,phonk,phonk music,phonk ${new Date().getFullYear()}`;

  // Features
  let feats = features.split(",").map((feat) => feat.trim());

  // First feat
  const firstFeat = feats[0];

  // Features
  if (features !== "none" && (tiktok === "false" || tiktok === "" || tiktok !== "true")) {
    tags += `,${firstFeat},${firstFeat} ${title},${artist} ${firstFeat} ${title}`;
    if (features.length >= 2) {
      // Second feat
      const secondFeat = feats[1];
    }
  }

  if (tiktok === "true") {
  }

  return tags;
};
