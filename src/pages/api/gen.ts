import {
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED,
  CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT,
  FEATURES_INPUT_FIELD_CHARACTER_LIMIT,
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT,
  TITLE_INPUT_FIELD_CHARACTER_LIMIT,
} from "@/lib/constants";
import { nightcoreSpedUpTags } from "@/lib/helpers/tags/nightcore-sped-up-tags";
import { slowedReverbTags } from "@/lib/helpers/tags/slowed-reverb-tags";
import { bassBoostedTags } from "@/lib/helpers/tags/bass-boosted-tags";
import type { NextApiRequest, NextApiResponse } from "next";
import { lyricsTags } from "@/lib/helpers/tags/lyrics-tags";
import { letraTags } from "@/lib/helpers/tags/letra-tags";
import { phonkTags } from "@/lib/helpers/tags/phonk-tags";
import { lyricsTitles } from "@/lib/helpers/titles/lyrics-titles";
import { letraTitles } from "@/lib/helpers/titles/letra-titles";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get the query parameters
  const features: string = req.query.features as string;
  const channel: string = req.query.channel as string;
  const tiktok: string = req.query.tiktok as string;
  const format: string = req.query.format as string;
  const artist: string = req.query.artist as string;
  const title: string = req.query.title as string;

  // Check if all the required fields are provided
  if (!artist || !title || !tiktok) {
    return res.status(400).json({
      success: false,
      error: "Please provide all the required fields.",
    });
  }

  // Checks if the artist field reaches the character limit
  if (artist.includes("-") || artist.includes(",")) {
    if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED) {
      res.status(400).json({
        success: false,
        error: "Character limit exceeded.",
      });
      return;
    }
  } else {
    if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT) {
      res.status(400).json({
        success: false,
        error: "Character limit exceeded.",
      });
      return;
    }
  }

  // Checks if the title field reaches the character limit
  if (title.length > TITLE_INPUT_FIELD_CHARACTER_LIMIT) {
    res.status(400).json({
      success: false,
      error: "Character limit exceeded.",
    });
    return;
  }

  // Checks if the features field reaches the character limit
  if (features.length > FEATURES_INPUT_FIELD_CHARACTER_LIMIT) {
    res.status(400).json({
      success: false,
      error: "Character limit exceeded.",
    });
    return;
  }

  // Checks if the channel field reaches the character limit
  if (channel.length > CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT) {
    res.status(400).json({
      success: false,
      error: "Character limit exceeded.",
    });
    return;
  }

  // Check if there are any commas in the title or artist
  if (/,/.test(title)) {
    return res.status(400).send({
      success: false,
      error: "Please remove any commas , from the title or artist.",
    });
  }

  let formatPureFormat = format.trim().toLowerCase();
  let tags;

  if (formatPureFormat === "bassboosted") {
    // Bass Boosted
    tags = bassBoostedTags(artist, title);
  } else if (formatPureFormat === "nightcore") {
    // Nightcore/Sped Up
    tags = nightcoreSpedUpTags(artist, title);
  } else if (formatPureFormat === "slowedreverb") {
    // Slowed/Reverb
    tags = slowedReverbTags(artist, title);
  } else if (formatPureFormat === "letra") {
    // Letra
    tags = letraTags(artist, title);
  } else if (formatPureFormat === "phonk") {
    // Phonk
    tags = phonkTags(artist, title);
  } else {
    // Lyrics
    tags = lyricsTags(artist, title);
  }

  // Part to generate tags for tiktok option
  if (tiktok === "true") {
    if (formatPureFormat === "bassboosted") {
      // Bass boosted
    } else if (formatPureFormat === "nightcore") {
      // Nightcore/sped up
      tags += `${artist} ${title} sped up tiktok remix,${title} sped up tiktok version`;
    } else if (formatPureFormat === "slowedreverb") {
      // Slowed/reverb
      tags += `,slowed tiktok songs`;
    } else {
      // Lyrics
      tags += `,${title} tiktok,${artist} tiktok`;
    }
  }

  // Probably shouldn't generate tags for features if tiktok is true because there would be too many tags
  // Part to generate tags for features
  if (
    features.toLowerCase().trim() !== "none" &&
    (tiktok === "false" || tiktok === "" || tiktok !== "true")
  ) {
    // Features
    let feats = features.split(",").map((feat) => feat.trim());

    // First feat
    const firstFeat = feats[0];

    // Only generate tags for the first feature
    if (formatPureFormat === "bassboosted") {
      // Only generate a few tags for bass boosted features
      tags += `${firstFeat} ${title} bass boosted,${title} ${firstFeat} bass boosted, ${firstFeat} ${title} bass,${title} ${firstFeat} bass, ${firstFeat} bass`;
      if (feats.length >= 2) {
        // Second feat
        const secondFeat = feats[1];
      }
    } else if (format.toLowerCase() === "letra") {
      tags += `,${firstFeat} ${title},${artist} ${firstFeat} ${title},${firstFeat} ${title} letra,${title} ${firstFeat},${artist} ${firstFeat},${firstFeat} ${artist},${firstFeat}`;
    } else if (formatPureFormat === "lyrics") {
      tags += `,${firstFeat} ${title} lyrics,lyrics ${firstFeat} ${title},${firstFeat} lyrics`;

      if (feats.length >= 2) {
        // Second feat
        const secondFeat = feats[1];
        tags += `,${artist} ${secondFeat} ${title} lyrics,${secondFeat} ${title} lyrics,lyrics ${secondFeat} ${title},${secondFeat} lyrics,lyrics ${secondFeat}`;
      }
    } else if (format.toLowerCase() === "slowedreverb") {
      tags += `,${firstFeat} ${title},${firstFeat} ${title} slowed,${artist} ${firstFeat} ${title} slowed,${firstFeat} ${title} slowed reverb,${firstFeat} slowed`;
    }
  }

  let tagsToBeRemoved: string[] = [];
  let removedTags = "";

  if (
    tiktok === "false" &&
    features.toLowerCase() === "none" &&
    tags.length > 800
  ) {
    tagsToBeRemoved =
      `${title} lyrics ${artist},lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title} ${artist},${title} lyric video,${artist} lyrics ${title},${artist},lyrics`.split(
        ","
      );
    let newTags: string = "";
    tags.split(",").forEach((tag, index) => {
      if (tag !== tagsToBeRemoved[index]) {
        newTags += `,${tag}`;
      }
    });
    removedTags = newTags;
  } else if (
    tiktok === "false" &&
    features.toLowerCase().trim() === "none" &&
    tags.length > 500
  ) {
    tagsToBeRemoved =
      `lyrics ${artist},${artist} lyrics,lyrics ${title} ${artist},${title} lyrics ${artist}`.split(
        ","
      );
    let newTags: string = "";
    tags.split(",").forEach((tag, index) => {
      if (tag !== tagsToBeRemoved[index]) {
        newTags += `,${tag}`;
      }
    });
    removedTags = newTags;
  } else if (tiktok === "false" && features.toLowerCase().trim() !== "none") {
    // Features
    let feats = features.split(",").map((feat) => feat.trim());
    // First feat
    const firstFeat = feats[0];

    tagsToBeRemoved =
      `${firstFeat} lyrics,lyrics ${firstFeat} ${title},${title} lyrics ${artist},${artist} lyrics,lyrics ${artist},${title} lyric video`.split(
        ","
      );
    let newTags: string = "";
    tags.split(",").forEach((tag, index) => {
      if (tag !== tagsToBeRemoved[index]) {
        newTags += `,${tag}`;
      }
    });
    removedTags = newTags;
  }

  if (formatPureFormat === "lyrics") {
    tags += ",lyrics";
  } else if (formatPureFormat === "letra") {
    tags += ",letra,latin,latin music";
  } else if (formatPureFormat === "phonk") {
    tags += `,phonk,phonk music,phonk ${new Date().getFullYear()},tiktok phonk`;
  }

  if (channel !== "none") {
    tags += `,${channel}`;
  }

  let endingTag = "Lyrics";
  let f: string = "";

  // Modify the ending tag based off the selected format
  if (format.trim() === "bassboosted") {
    endingTag = "BoostedBoosted";
  } else if (format.trim() === "nightcore") {
    endingTag = "Nightcore";
  } else if (format.trim() === "slowedreverb") {
    endingTag = "Slowed";
  }

  const feats: string[] = features
    .split(",")
    .map((feat) => `${feat[0].toUpperCase()}${feat.substring(1)}`);

  // Lyrics
  if (formatPureFormat === "lyrics") {
    if (feats.includes("None")) feats.pop();
    f += lyricsTitles(artist, title, feats);
  }

  // Letra
  if (formatPureFormat === "letra") {
    if (feats.includes("None")) feats.pop();
    f += letraTitles(artist, title, feats);
  }

  // Slowed & Reverb
  if (formatPureFormat === "slowedreverb") {
    if (features.toLowerCase() !== "none") {
      if (feats.length === 1) {
        f += `${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (slowed & reverb)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (slowed & reverb)`;
      }

      if (feats.length === 2) {
        f += `${artist.trim()}, ${feats[0]} & ${
          feats[1]
        } - ${title.trim()} (slowed & reverb)=${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} (slowed & reverb) ft. ${feats[1].trim()}`;
      }

      if (feats.length === 3) {
        f += `${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[0].trim()}, ${feats[1].trim()}, ${feats[2].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[1].trim()}, ${feats[2].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[1].trim()} & ${feats[2].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[1].trim()}, ${feats[2].trim()}`;
      }
    } else {
      f += `${artist.trim()} - ${title.trim()} (slowed & reverb)=${artist.trim()} - ${title.trim()} [slowed & reverb]`;
    }
  }

  // Phonk
  if (formatPureFormat === "phonk") {
    if (features.toLowerCase() !== "none") {
    } else {
      f += `${artist} - ${title}=${artist} - ${title} [Phonk]=${title}`;
    }
  }

  // Bass Boosted
  if (formatPureFormat === "bassboosted") {
    if (features.toLowerCase() !== "none") {
      if (feats.length === 1) {
        f += `${artist.trim()} - ${title.trim()} (Bass Boosted) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (Bass Boosted)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Bass Boosted)=
        ${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} 🔥 (Bass Boosted)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} 🔥 (Bass Boosted)=
        ${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} 🔊 (Bass Boosted)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} 🔊 (Bass Boosted)`;
      }

      // If there are two features
      if (feats.length === 2) {
        f += `${artist.trim()} - ${title.trim()} (Bass Boosted) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Bass Boosted) ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${feats[1].trim()}
        =${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${feats[1].trim()}`;
      }

      // If there are three features
      if (feats.length === 3) {
        f += `${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} (Bass Boosted) ft. ${feats[1]}, ${
          feats[2]
        }=${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} 🔥 (Bass Boosted) ft. ${feats[1]}, ${
          feats[2]
        }=${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} 🔊 (Bass Boosted) ft. ${feats[1]}, ${feats[2]}`;
      }
    } else {
      f += `${artist.trim()} - ${title.trim()} (Bass Boosted)=${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted)=${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted)=${artist.trim()} - ${title.trim()} [Bass Boosted]=${artist.trim()} - ${title.trim()} 🔥 [Bass Boosted]=${artist.trim()} - ${title.trim()} 🔊 [Bass Boosted]`;
    }
  }

  // Send the response
  res.status(200).json({
    success: true,
    tags: tags.toLowerCase(),
    tagsToBeRemoved,
    removedTags,
    removedTagsLength: removedTags.length,
    title: title.trim(),
    artist: artist.trim(),
    t: `${artist.trim()} - ${title.trim()}`,
    features:
      features.toLowerCase() !== "none"
        ? features
            .split(",")
            .map((feat) =>
              `${feat[0].toUpperCase()}${feat.substring(1)}`.trim()
            )
        : [],
    extras: {
      titles: f,
    },
    url: `/api/gen?title=${encodeURIComponent(
      title
    )}&artist=${encodeURIComponent(artist)}&features=${encodeURIComponent(
      features
    )}&tiktok=${
      tiktok === "" ? "false" : tiktok !== "true" ? "false" : "true"
    }&format=${format.trimStart().trimEnd()}&channel=${
      channel ? channel : "none"
    }`,
    length: tags
      .split(",")
      .map((tag) => tag.trim())
      .join(",  ").length,
  });
}
