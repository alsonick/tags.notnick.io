export const bassBoostedTitles = (
  artist: string,
  title: string,
  feats: string[]
): string => {
  const firstFeat = feats[0];
  const secondFeat = feats[1];
  const thirdFeat = feats[2];

  switch (feats.length) {
    case 1:
      return `${artist.trim()} - ${title.trim()} (Bass Boosted) ft. ${firstFeat.trim()}=${artist.trim()} & ${firstFeat.trim()} - ${title.trim()} (Bass Boosted)=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} (Bass Boosted)=
        ${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${firstFeat.trim()}=${artist.trim()} & ${firstFeat.trim()} - ${title.trim()} 🔥 (Bass Boosted)=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} 🔥 (Bass Boosted)=
        ${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${firstFeat.trim()}=${artist.trim()} & ${firstFeat.trim()} - ${title.trim()} 🔊 (Bass Boosted)=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} 🔊 (Bass Boosted)`;
    case 2:
      `${artist.trim()} - ${title.trim()} (Bass Boosted) ft. ${firstFeat.trim()}, ${secondFeat.trim()}=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} (Bass Boosted) ft. ${secondFeat.trim()}=${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${firstFeat.trim()}, ${secondFeat.trim()}=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${secondFeat.trim()}
        =${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${firstFeat.trim()}, ${secondFeat.trim()}=${artist.trim()}, ${firstFeat.trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${secondFeat.trim()}`;
    case 3:
      return `${artist.trim()}, ${firstFeat} - ${title.trim()} (Bass Boosted) ft. ${secondFeat}, ${thirdFeat}=${artist.trim()}, ${firstFeat} - ${title.trim()} 🔥 (Bass Boosted) ft. ${secondFeat}, ${thirdFeat}=${artist.trim()}, ${firstFeat} - ${title.trim()} 🔊 (Bass Boosted) ft. ${secondFeat}, ${thirdFeat}`;
    default:
      return `${artist.trim()} - ${title.trim()} (Bass Boosted)=${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted)=${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted)=${artist.trim()} - ${title.trim()} [Bass Boosted]=${artist.trim()} - ${title.trim()} 🔥 [Bass Boosted]=${artist.trim()} - ${title.trim()} 🔊 [Bass Boosted]`;
  }
};
