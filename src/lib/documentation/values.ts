import { Value } from "@/types/documentation/value";

// Params, Required, Default, Description

export const VALUES_LENGTH: Value[] = [
  // Tags
  {
    placeholder: "tags",
  },
  {
    placeholder: "Yes",
  },
  {
    placeholder: "None",
  },
  {
    placeholder: "The generated tags you want to find the length for.",
  },
];

export const VALUES_GENERATE: Value[] = [
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
      "Name of the artist. You can provide both the `artist` and the `title` components in this field, e.g. `Rex Orange County – Pluto Projector` is appropriate.",
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
      "Name of the song. Not required if both the artist and title components are provided in the `artist` parameter.",
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
      "Featured artists. If you provide more than 3 featuring artists, then only the first 3 features will be used when generating the tags.",
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
      "Provides additional tags related to TikTok, It's recommended for songs that are performing well on TikTok (`true` / `false`).",
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
    placeholder: "The name of the YouTube channel you want featured in the generated tags.",
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
    list: [
      "Lyrics (lyrics)",
      "Bass Boosted (bassboosted)",
      "Nightcore/Sped Up (nightcore)",
      "Slowed/Reverb (slowed)",
      "Letra (letra)",
      "Phonk (phonk)",
      "Testo (testo)",
    ],
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
    placeholder: "The option to shuffle the generated tags (`true` or `false`).",
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
    list: [
      "None (none)",
      "Country (country)",
      "Latin (latin)",
      "Phonk (phonk)",
      "Pop (pop)",
      "Rap (rap)",
      "Italian (italian)",
    ],
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
  // Custom
  {
    placeholder: "custom",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "None",
  },
  {
    placeholder: "The custom format string template that you want to use.",
  },
  // Log
  {
    placeholder: "log",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "true",
  },
  {
    placeholder:
      "All request data (generated tags) is logged for debugging purposes, if you wish to not have your data logged, then provide `false` as the parameter value.",
  },
  // Webhook
  {
    placeholder: "webhook",
  },
  {
    placeholder: "No",
  },
  {
    placeholder: "None",
  },
  {
    placeholder:
      "Request data is logged in private Discord channels. You may optionally provide a webhook link to log data in your own private channel. Your webhook link is never stored or logged.",
  },
];
