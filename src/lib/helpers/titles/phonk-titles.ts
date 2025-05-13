export const phonkTitles = (
  artist: string,
  title: string,
  feats: string[]
): string => {
  switch (feats.length) {
    default:
      return `${artist} - ${title}=${artist} - ${title} [Phonk]=${title}`;
  }
};
