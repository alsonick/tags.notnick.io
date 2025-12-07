import { Value } from "@/types/documentation/value";

// Params, Required, Default, Description

export const VALUES: Value[] = [
  // Artist
  {
    placeholder: "artist",
  },
  {
    placeholder: "Yes",
  },
  {
    placeholder: "None",
  },
  {
    placeholder:
      "Name of the artist. You can also provide both the artist and the title, for example: `Rex Orange County – Pluto Projector` or `The Chainsmokers, Daya - Don't Let Me Down`.",
  },
  // Title
  {
    placeholder: "title",
  },
  {
    placeholder: "Yes",
  },
  {
    placeholder: "None",
  },
  {
    placeholder:
      "Name of the song. Not required if both the artist and title components are provided in the artist parameter.",
  },
  // Features
  {
    placeholder: "features",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "None",
  },
  {
    placeholder:
      "Featured artists, if you provide more than 3 featuring artists, then only the first 3 features will be used when generating the tags.",
  },
  // TikTok
  {
    placeholder: "tiktok",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "false",
  },
  {
    placeholder:
      "Provides additional tags related to TikTok, It's recommended for songs that are performing well on TikTok. (`true` / `false`). You can also pass in the short form (`t` / `f`).",
  },
  // Channel
  {
    placeholder: "channel",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "None",
  },
  {
    placeholder:
      "The name of the YouTube channel you want featured in the generated tags. Example: `Polaris Lyrics` or `Aquila`.",
  },
  // Format
  {
    placeholder: "format",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "Lyrics",
  },
  {
    list: ["Lyrics", "Bass Boosted", "Nightcore/Sped Up", "Slowed/Reverb", "Letra", "Phonk", "Testo"],
  },
  // Shuffle
  {
    placeholder: "shuffle",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "false",
  },
  {
    placeholder:
      "An option that shuffles the generated tags, the parameter value should either be `true` or `false`. You can also pass in the short form (`t` / `f`).",
  },
  // Genre
  {
    placeholder: "genre",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "None",
  },
  {
    list: ["None", "Country", "Latin", "Phonk", "Pop", "Rap", "Italian"],
  },
  // Verse
  {
    placeholder: "verse",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "None",
  },
  {
    placeholder: "3 short verses. Each individual verse should be separated by a comma.",
  },
];
