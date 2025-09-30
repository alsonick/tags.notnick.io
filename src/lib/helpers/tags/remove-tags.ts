import { slowedReverbTagsRemove } from "./remove/slowed-reverb-tags-remove";
import { bassBoostedTagsRemove } from "./remove/bass-boosted-tags-remove";
import { lyricsTagsRemove } from "./remove/lyrics-tags-remove";
import { testoTagsRemove } from "./remove/testo-tags-remove";
import { letraTagsRemove } from "./remove/letra-tags-remove";
import { FORMAT } from "@/lib/format";

export const removeTags = (
  title: string,
  artist: string,
  features: string,
  format: string,
  tiktok: string,
  tags: string
): string => {
  // Lyrics
  if (format === FORMAT.lyrics) {
    return lyricsTagsRemove(title, artist, features, tiktok, tags);
  }

  // Slowed & Reverb
  if (format === FORMAT.slowedreverb) {
    return slowedReverbTagsRemove(title, artist, features, tiktok, tags);
  }

  // Bass Boosted
  if (format === FORMAT.bassboosted) {
    return bassBoostedTagsRemove(title, artist, features, tiktok, tags);
  }

  // Letra
  if (format === FORMAT.letra) {
    return letraTagsRemove(title, artist, features, tiktok, tags);
  }

  // Testo
  if (format === FORMAT.testo) {
    return testoTagsRemove(title, artist, features, tiktok, tags);
  }

  return "";
};
