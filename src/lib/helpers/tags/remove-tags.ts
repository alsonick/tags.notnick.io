import { nightcoreSpedUpTagsRemove } from "./remove/nightcore-sped-up-tags-remove";
import { slowedReverbTagsRemove } from "./remove/slowed-reverb-tags-remove";
import { bassBoostedTagsRemove } from "./remove/bass-boosted-tags-remove";
import { lyricsTagsRemove } from "./remove/lyrics-tags-remove";
import { testoTagsRemove } from "./remove/testo-tags-remove";
import { letraTagsRemove } from "./remove/letra-tags-remove";
import { phonkTagsRemove } from "./remove/phonk-tags-remove";
import { FORMAT } from "@/lib/format";
import { noneTagsRemove } from "./remove/none-tags-remove";

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

  // Nightcore / Sped Up
  if (format === FORMAT.nightcore) {
    return nightcoreSpedUpTagsRemove(title, artist, features, tiktok, tags);
  }

  // Letra
  if (format === FORMAT.letra) {
    return letraTagsRemove(title, artist, features, tiktok, tags);
  }

  // Testo
  if (format === FORMAT.testo) {
    return testoTagsRemove(title, artist, features, tiktok, tags);
  }

  // Phonk
  if (format === FORMAT.phonk) {
    return phonkTagsRemove(title, artist, features, tiktok, tags);
  }

  // None
  if (format === FORMAT.none) {
    return noneTagsRemove(title, artist, features, tiktok, tags);
  }

  return "";
};
