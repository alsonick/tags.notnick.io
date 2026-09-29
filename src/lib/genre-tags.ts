import { GENRE } from './genre';

// The extra tags appended to the generated set for a genre.
// Shared by the generate endpoint and the genre page so they never drift apart.
export const genreTags = (genre: string, year: number = new Date().getFullYear()): string[] => {
  switch (genre) {
    case GENRE.rap:
    case GENRE.hiphop:
      return ['rap', 'hiphop', `rap ${year}`, 'rap music', 'rap lyrics'];
    case GENRE.country:
      return ['country', `country ${year}`, 'country music', 'country lyrics'];
    case GENRE.pop:
      return ['pop', `pop ${year}`, 'pop music', 'trending pop'];
    case GENRE.funk:
    case GENRE.phonk:
      return ['phonk', 'funk', 'phonk music', `phonk ${year}`, 'new phonk'];
    case GENRE.latin:
      return ['letra', 'latin', 'latin music', 'trending latin'];
    case GENRE.italian:
      return ['italian lyrics', 'italian music', 'trending italian'];
    case GENRE.dance:
      return ['dance music', 'dance', 'trending dance', `dance ${year}`];
    case GENRE.alternative:
      return ['alternative', `alternative ${year}`, 'alternative music', 'alternative rock'];
    case GENRE.emo:
      return ['emo', `emo ${year}`, 'emo music', 'emo rap'];
    case GENRE.rock:
      return ['rock', `rock ${year}`, 'rock music', 'rock lyrics'];
    case GENRE.edm:
      return ['edm', `edm ${year}`, 'edm music', 'electronic dance music'];
    case GENRE.trap:
      return ['trap', `trap ${year}`, 'trap music', 'new trap'];
    case GENRE.electronic:
      return ['electronic', `electronic ${year}`, 'electronic music', 'trending electronic'];
    default:
      return [];
  }
};
