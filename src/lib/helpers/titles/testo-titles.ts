export const testoTitles = (artist: string, title: string, feats: string[]): string => {
  switch (feats.length) {
    case 1:
      return `${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Testo)=${artist.trim()} - ${title.trim()} (Testo) ft. ${feats[0].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Testo]=${artist.trim()} - ${title.trim()} [Testo] ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (Testo)=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} [Testo]`;
    case 2:
      return `${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Testo) ft. ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Testo] ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} (Testo) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()} - ${title.trim()} [Testo] ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (Testo) ft. ${feats[1].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} [Testo] ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} (Testo) ft. ${feats[0].trim()} & ${feats[1].trim()}=${artist.trim()} - ${title.trim()} [Testo] ft. ${feats[0].trim()}, ${feats[1].trim()}`;
    case 5:
      `${artist.trim()} x ${feats[0].trim()} - ${title.trim()} (Testo) ft. ${feats[1].trim()}, ${feats[2].trim()}, ${feats[3].trim()}, ${feats[4].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Testo) ft. ${feats[1].trim()}, ${feats[2].trim()}, ${feats[3].trim()}, ${feats[4].trim()}=${artist.trim()} x ${feats[0].trim()} - ${title.trim()} [Testo] ft. ${feats[1].trim()}, ${feats[2].trim()}, ${feats[3].trim()}, ${feats[4].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Testo] ft. ${feats[1].trim()}, ${feats[2].trim()}, ${feats[3].trim()}, ${feats[4].trim()}`;
    default:
      return `${artist.trim()} - ${title.trim()} (Testo / Lyrics)=${artist.trim()} - ${title.trim()} (Testo)=${artist.trim()} - ${title.trim()} [Testo]`;
  }
};
