export const lyricsTitles = (
  artist: string,
  title: string,
  feats: string[]
): string => {
  switch (feats.length) {
    case 1:
      return `${artist.trim()} - ${title.trim()} (Lyrics) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (Lyrics)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Lyrics)=${artist.trim()} - ${title.trim()} [Lyrics] ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} [Lyrics]=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Lyrics]`;
    case 2:
      `${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Lyrics) ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} (Lyrics) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()} - ${title.trim()} (Lyrics) ft. ${feats[0].trim()} & ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Lyrics] ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} [Lyrics] ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()} - ${title.trim()} [Lyrics] ft. ${feats[0].trim()} & ${feats[1].trim()}`;
    case 3:
      `${artist.trim()}, ${feats[0]} - ${title.trim()} (Lyrics) ft. ${
        feats[1]
      }, ${feats[2]}=${artist.trim()} - ${title.trim()} (Lyrics) ft. ${
        feats[0]
      }, ${feats[1]} & ${feats[2]}=${artist.trim()}, ${
        feats[0]
      } - ${title.trim()} (Lyrics) ft. ${feats[1]} & ${
        feats[2]
      }=${artist.trim()}, ${feats[0]} - ${title.trim()} [Lyrics] ft. ${
        feats[1]
      }, ${feats[2]}=${artist.trim()} - ${title.trim()} [Lyrics] ft. ${
        feats[0]
      }, ${feats[1]} & ${feats[2]}=${artist.trim()}, ${
        feats[0]
      } - ${title.trim()} [Lyrics] ft. ${feats[1]} & ${feats[2]}`;
    default:
      return `${artist.trim()} - ${title.trim()} (Lyrics)=${artist.trim()} - ${title.trim()} [Lyrics]`;
  }
};
