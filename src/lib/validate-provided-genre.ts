export const validateProvidedGenre = (genre: string): boolean => {
  switch (genre.toLowerCase()) {
    case "rap":
      return true;
    case "hiphop":
      return true;
    case "pop":
      return true;
    case "none":
      return true;
    case "country":
      return true;
    case "funk":
      return true;
    case "phonk":
      return true;
    case "latin":
      return true;
    default:
      return false;
  }
};
