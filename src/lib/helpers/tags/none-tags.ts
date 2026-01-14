export const noneTags = (artist: string, title: string, features: string, tiktok: string): string => {
  // Tags
  let tags = `${artist} ${title},${artist},${title},${title} ${artist},${artist} - ${title},${title} official audio,${artist} new song,${artist} music,${artist} ${title} official audio,${artist} ${title} song,${title} ${artist} audio,${title} full song,${artist} ${title} full song,${title} official`;

  // Features
  let feats = features.split(',').map((feat) => feat.trim());

  // First feature
  const firstFeature = feats[0];

  // Features
  if (features !== 'none' && (tiktok === 'false' || tiktok === '' || tiktok !== 'true')) {
    tags += `,${firstFeature},${artist} ${firstFeature},${firstFeature} ${title},${artist} ${firstFeature} ${title},${artist} ${firstFeature} ${title} official audio,${artist} ${firstFeature} ${title} track,${artist} ${firstFeature} ${title} song`;

    // Second feature
    if (feats.length === 2) {
      const secondFeature = feats[1];

      tags += `,${secondFeature},${artist} ${secondFeature},${secondFeature} ${title},${artist} ${secondFeature} ${title},${artist} ${secondFeature} ${title} official audio,${artist} ${secondFeature} ${title} track`;
    }

    // Third feature
    if (feats.length === 3) {
      const thirdFeature = feats[2];

      tags += `,${thirdFeature},${artist} ${thirdFeature},${thirdFeature} ${title},${artist} ${thirdFeature} ${title},${artist} ${thirdFeature} ${title} official audio`;
    }
  }

  if (tiktok === 'true') {
    tags += `,tiktok,${title} tiktok,trending tiktok,tiktok songs`;
  }

  return tags;
};
