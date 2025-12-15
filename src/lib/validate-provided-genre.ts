import { GENRE } from "./genre";

export const validateProvidedGenre = (genre: string): boolean => {
  switch (genre.toLowerCase()) {
    case GENRE.rap:
      return true;
    case GENRE.hiphop:
      return true;
    case GENRE.pop:
      return true;
    case GENRE.none:
      return true;
    case GENRE.country:
      return true;
    case GENRE.funk:
      return true;
    case GENRE.phonk:
      return true;
    case GENRE.dance:
      return true;
    case GENRE.latin:
      return true;
    case GENRE.italian:
      return true;
    default:
      return false;
  }
};
