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
    placeholder: "The custom format string template that you want to use for your generated tags.",
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
      "All request data is logged for debugging purposes, if you wish to not have your data logged, then provide `false` as the parameter value.",
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
      "We use private Discord channels to log request data, if you'd like to have your data logged in your own private channel, then provide us with your webhook link. Don't worry, your provided webhook link is never logged or stored with us.",
  },
];
