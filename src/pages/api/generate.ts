import {
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED,
  CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT,
  FEATURES_INPUT_FIELD_CHARACTER_LIMIT,
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT,
  TITLE_INPUT_FIELD_CHARACTER_LIMIT,
} from "@/lib/constants";
import { nightcoreSpedUpTags } from "@/lib/helpers/tags/nightcore-sped-up-tags";
import { slowedReverbTitles } from "@/lib/helpers/titles/slowed-reverb-titles";
import { bassBoostedTitles } from "@/lib/helpers/titles/bass-boosted-titles";
import { slowedReverbTags } from "@/lib/helpers/tags/slowed-reverb-tags";
import { bassBoostedTags } from "@/lib/helpers/tags/bass-boosted-tags";
import { returnComputedFormat } from "@/lib/return-computed-format";
import { computeFinalHashtags } from "@/lib/compute-final-hashtag";
import { lyricsTitles } from "@/lib/helpers/titles/lyrics-titles";
import { removeTags } from "./../../lib/helpers/tags/remove-tags";
import { letraTitles } from "@/lib/helpers/titles/letra-titles";
import { phonkTitles } from "@/lib/helpers/titles/phonk-titles";
import type { NextApiRequest, NextApiResponse } from "next";
import { lyricsTags } from "@/lib/helpers/tags/lyrics-tags";
import { countTagsLength } from "@/lib/count-tags-length";
import { letraTags } from "@/lib/helpers/tags/letra-tags";
import { phonkTags } from "@/lib/helpers/tags/phonk-tags";
import { removeEmojis } from "@/lib/remove-emojis";
import { shuffleTags } from "@/lib/shuffle-tags";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get the query parameters
  const features: string = req.query.features as string;
  const channel: string = req.query.channel as string;
  const shuffle: string = req.query.shuffle as string;
  const tiktok: string = req.query.tiktok as string;
  const format: string = req.query.format as string;
  const artist: string = req.query.artist as string;
  const title: string = req.query.title as string;

  // Check if all the required fields are provided
  if (!artist || !tiktok) {
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

  // Process and compute final values locally without immediately updating state
  let finalFeatures = features;
  let finalArtist = artist;
  let extractedTitle = "";
  let finalTitle = title;
  let finalFormat = "";
  let formatText = "";

  // Modified if statement to check for both standard hyphen and em dash
  if (artist.includes(",") || artist.includes("-")) {
    // Determine which separator to use for splitting (standard hyphen or em dash)
    const separator = artist.includes("—") ? "—" : "-";
    const data = artist.split(separator);

    let mainPart = artist;

    if (artist.includes(separator)) {
      const titleFormatString = data[1].trim();
      mainPart = data[0].trim();

      // Extract title before any format indicators
      if (titleFormatString.includes("(")) {
        extractedTitle = removeEmojis(titleFormatString.split("(")[0].trim());
      } else if (titleFormatString.includes("[")) {
        extractedTitle = removeEmojis(titleFormatString.split("[")[0].trim());
      } else {
        extractedTitle = removeEmojis(titleFormatString);
      }

      // Process format from parentheses or brackets
      if (titleFormatString.includes("(")) {
        formatText = removeEmojis(titleFormatString.replace("(", ""))
          .replace(extractedTitle, "")
          .trim();
      } else if (titleFormatString.includes("[")) {
        formatText = removeEmojis(titleFormatString.replace("[", ""))
          .replace(extractedTitle, "")
          .trim();
      }
    }

    // Process artist and features from the main part
    const artistsArray = mainPart.split(",").map((a) => a.trim());

    finalArtist = artistsArray[0];
    finalFeatures = artistsArray.slice(1).join(", ");

    if (!finalFeatures) {
      finalFeatures = "none";
    }
  }

  if (extractedTitle.length) {
    finalTitle = extractedTitle.trim();
  } else {
    finalTitle = title.trim();
  }

  // If format text was found, process it
  if (formatText.length) {
    // Get standardized format name and ensure it's lowercase for the API
    finalFormat = returnComputedFormat(formatText).toLowerCase();
  } else {
    finalFormat = format;
  }

  // Error if artist includes separators but title is already specified
  if (artist.includes(",") || artist.includes("-")) {
    if (title !== "none") {
      return res.status(400).json({
        success: false,
        error: "The artist and title was already provided in the artist field.",
      });
    }
  }

  let formatPureFormat = finalFormat.trim().toLowerCase();
  let tags: string = "";

  if (formatPureFormat === "bassboosted") {
    // Bass Boosted
    tags = bassBoostedTags(finalArtist, finalTitle, finalFeatures, tiktok);
  } else if (formatPureFormat === "nightcore") {
    // Nightcore/Sped Up
    tags = nightcoreSpedUpTags(finalArtist, finalTitle, finalFeatures, tiktok);
  } else if (formatPureFormat === "slowedreverb") {
    // Slowed/Reverb
    tags = slowedReverbTags(finalArtist, finalTitle, finalFeatures, tiktok);
  } else if (formatPureFormat === "letra") {
    // Letra
    tags = letraTags(finalArtist, finalTitle, finalFeatures, tiktok);
  } else if (formatPureFormat === "phonk") {
    // Phonk
    tags = phonkTags(finalArtist, finalTitle, finalFeatures, tiktok);
  } else if (formatPureFormat === "lyrics") {
    // Lyrics
    tags = lyricsTags(finalArtist, finalTitle, finalFeatures, tiktok);
  }

  let tagsToBeRemoved = "";
  let removedTags = "";

  if (shuffle === "true") {
    removedTags = shuffleTags(removedTags);
    tags = shuffleTags(tags);
  }

  if (channel !== "none") {
    removedTags += `,${channel}`.toLowerCase();
    tags += `,${channel}`.toLowerCase();
  }

  tagsToBeRemoved = removeTags(
    finalTitle,
    finalArtist,
    finalFeatures,
    finalFormat,
    tiktok,
    tags
  );

  removedTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => {
      if (!tag) return false;

      const tagsToRemoveArray = tagsToBeRemoved
        .split(",")
        .map((t) => t.trim().toLowerCase());

      return !tagsToRemoveArray.includes(tag.toLowerCase());
    })
    .join(",");

  let titles: string = "";

  const feats: string[] = finalFeatures.length
    ? finalFeatures
        .split(",")
        .map((feat) => `${feat[0].toUpperCase()}${feat.substring(1)}`)
    : [];

  // Lyrics
  if (formatPureFormat === "lyrics") {
    if (feats.includes("None")) feats.pop();
    titles += lyricsTitles(finalArtist, finalTitle, feats);
  }

  // Letra
  if (formatPureFormat === "letra") {
    if (feats.includes("None")) feats.pop();
    titles += letraTitles(finalArtist, finalTitle, feats);
  }

  // Slowed & Reverb
  if (formatPureFormat === "slowedreverb") {
    if (feats.includes("None")) feats.pop();
    titles += slowedReverbTitles(finalArtist, finalTitle, feats);
  }

  // Phonk
  if (formatPureFormat === "phonk") {
    if (feats.includes("None")) feats.pop();
    titles += phonkTitles(finalArtist, finalTitle, feats);
  }

  // Bass Boosted
  if (formatPureFormat === "bassboosted") {
    if (feats.includes("None")) feats.pop();
    titles += bassBoostedTitles(finalArtist, finalTitle, feats);
  }

  const hashtags = [
    finalArtist.replaceAll(" ", ""),
    finalTitle.replaceAll(" ", ""),
    computeFinalHashtags(finalFormat),
  ];

  // Send data to discord webhook (tags)
  const hook1 = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: "POST",
    body: JSON.stringify({
      embeds: [
        {
          author: {
            name: `${finalArtist} - ${finalTitle}`,
          },
          timestamp: new Date().toISOString(), // Add ISO timestamp
          fields: [
            {
              name: "Artist:",
              value: finalArtist,
              inline: true,
            },
            {
              name: "Title:",
              value: finalTitle,
              inline: true,
            },
            {
              name: "Tiktok:",
              value: tiktok,
              inline: true,
            },
            {
              name: "Format:",
              value: computeFinalHashtags(finalFormat),
              inline: true,
            },
            {
              name: "Channel:",
              value: channel,
              inline: true,
            },
            {
              name: "Length:",
              value: removedTags.length
                ? countTagsLength(removedTags)
                : countTagsLength(tags),
              inline: true,
            },
            {
              name: "Features:",
              value: finalFeatures.length ? finalFeatures : "none",
            },
            {
              name: "Tags:",
              value: tags.toLowerCase(),
            },
            {
              name: "Remove:",
              value: tagsToBeRemoved.length ? tagsToBeRemoved : "none",
            },
          ],
        },
      ],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Checks if the hook request went through
  if (hook1.status >= 400) {
    return res.json({ success: false, error: "Something went wrong." });
  }

  // Send the response
  res.status(200).json({
    success: true,
    tags: tags.toLowerCase(),
    tagsToBeRemoved: tagsToBeRemoved.toLowerCase(),
    removedTags: removedTags.toLowerCase(),
    removedTagsLength: countTagsLength(removedTags),
    title: finalTitle.trim(),
    artist: finalArtist.trim(),
    features: finalFeatures !== "none" ? finalFeatures.split(", ") : [],
    hashtags,
    extras: {
      titles,
    },
    url: `/api/generate?title=${encodeURIComponent(
      finalTitle
    )}&artist=${encodeURIComponent(finalArtist)}&features=${encodeURIComponent(
      finalFeatures
    )}&tiktok=${
      tiktok === "" ? "false" : tiktok !== "true" ? "false" : "true"
    }&format=${finalFormat}&channel=${
      channel ? encodeURIComponent(channel) : "none"
    }&shuffle=${shuffle || shuffle === "true" ? "true" : "false"}`,
    length: countTagsLength(tags),
  });
}
