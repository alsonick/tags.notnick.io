export const slowedReverbTitles = (
  artist: string,
  title: string,
  feats: string[]
): string => {
  const firstFeat = feats[0];
  const secondFeat = feats[1];
  const thirdFeat = feats[2];

  switch (feats.length) {
    case 1:
      return `${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${firstFeat.trim()}=${artist.trim()} & ${firstFeat.trim()} - ${title.trim()} (slowed & reverb)=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} (slowed & reverb)`;
    case 2:
      return `${artist.trim()}, ${firstFeat} & ${secondFeat} - ${title.trim()} (slowed & reverb)=${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${firstFeat.trim()}, ${secondFeat.trim()}=${artist.trim()}, ${firstFeat} - ${title.trim()} (slowed & reverb) ft. ${secondFeat.trim()}`;
    case 3:
      return `${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${firstFeat.trim()}, ${secondFeat.trim()}, ${thirdFeat.trim()}=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} (slowed & reverb) ft. ${secondFeat.trim()}, ${thirdFeat.trim()}=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} (slowed & reverb) ft. ${secondFeat.trim()} & ${thirdFeat.trim()}=${artist.trim()} & ${firstFeat.trim()} - ${title.trim()} (slowed & reverb) ft. ${secondFeat.trim()}, ${thirdFeat.trim()}`;
    default:
      return `${artist.trim()} - ${title.trim()} (slowed & reverb)=${artist.trim()} - ${title.trim()} [slowed & reverb]`;
  }
};
