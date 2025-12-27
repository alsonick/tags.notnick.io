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
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { validateProvidedGenre } from "@/lib/validate-provided-genre";
import { removeTags } from "./../../../lib/helpers/tags/remove-tags";
import { returnComputedFormat } from "@/lib/return-computed-format";
import { computeFinalHashtags } from "@/lib/compute-final-hashtag";
import { lyricsTitles } from "@/lib/helpers/titles/lyrics-titles";
import { letraTitles } from "@/lib/helpers/titles/letra-titles";
import { phonkTitles } from "@/lib/helpers/titles/phonk-titles";
import { sendDiscordWebhook } from "@/lib/send-discord-webhook";
import { computeTikTokValue } from "@/lib/compute-tiktok-value";
import { testoTitles } from "@/lib/helpers/titles/testo-titles";
import { noneTitles } from "@/lib/helpers/titles/none-titles";
import type { NextApiRequest, NextApiResponse } from "next";
import { lyricsTags } from "@/lib/helpers/tags/lyrics-tags";
import { testoTags } from "@/lib/helpers/tags/testo-lyrics";
import { countTagsLength } from "@/lib/count-tags-length";
import { letraTags } from "@/lib/helpers/tags/letra-tags";
import { phonkTags } from "@/lib/helpers/tags/phonk-tags";
import { noneTags } from "@/lib/helpers/tags/none-tags";
import { removeEmojis } from "@/lib/remove-emojis";
import { shuffleTags } from "@/lib/shuffle-tags";
import { urlBuilder } from "@/lib/url-builder";
import { FORMAT } from "@/lib/format";
import { error } from "@/lib/error";
import { GENRE } from "@/lib/genre";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: error.message.methodNotAllowed });
  }

  // Get the query parameters
  const source: string = (req.query.source as string) || "unknown";
  const example: string = (req.query.example as string) || "false";
  const webhook: string = (req.query.webhook as string) || "none";
  const genre: string = (req.query.genre as string) || "none";
  const verse: string = (req.query.verse as string) || "none";
  const structure: string = req.query.structure as string;
  const log: string = (req.query.log as string) || "true";
  const features: string = req.query.features as string;
  const channel: string = req.query.channel as string;
  const shuffle: string = req.query.shuffle as string;
  const tiktok: string = req.query.tiktok as string;
  const format: string = req.query.format as string;
  const artist: string = req.query.artist as string;
  const title: string = req.query.title as string;

  // Check if the artist field ends with ",-" which means the title wasn't provided.
  if (/,-$/.test(artist)) {
    return res.status(400).json({
      error: error.message.provideTitle,
      success: false,
    });
  }

  // Check if the artist field starts with ",-" which means the title wasn't provided.
  if (/^,-/.test(artist)) {
    return res.status(400).json({
      error: error.message.invalidFormat,
      success: false,
    });
  }

  // Check if all the required fields are provided
  if (!artist || !tiktok) {
    return res.status(400).json({
      error: error.message.provideAllRequiredFields,
      success: false,
    });
  }

  if (typeof verse === "string" && !/^[a-zA-Z ,]*$/.test(verse)) {
    return res.status(400).json({
      error: error.message.removeSpecialCharactersAndNumbersExceptCommasVerse,
      success: false,
    });
  }

  if (!validateProvidedGenre(genre)) {
    return res.status(400).json({
      error: error.message.provideAValidGenre,
      success: false,
    });
  }

  // Check if the structure query includes one of the valid accepted structures
  // TODO: Finish this later
  // if (!["1", "3", "4"].includes(structure)) {
  //   return res.status(400).json({
  //     error: "",
  //   });
  // }

  if (/,|-/.test(artist)) {
    // Checks if the artist field reaches the character limit
    if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED) {
      res.status(400).json({
        error: error.message.characterLimitExceeded,
        success: false,
      });
      return;
    }
  } else {
    if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT) {
      res.status(400).json({
        error: error.message.characterLimitExceeded,
        success: false,
      });
      return;
    }
  }

  // Checks if the title field reaches the character limit
  if (title.length > TITLE_INPUT_FIELD_CHARACTER_LIMIT) {
    res.status(400).json({
      error: error.message.characterLimitExceeded,
      success: false,
    });
    return;
  }

  // Checks if the features field reaches the character limit
  if (features.length > FEATURES_INPUT_FIELD_CHARACTER_LIMIT) {
    res.status(400).json({
      error: error.message.characterLimitExceeded,
      success: false,
    });
    return;
  }

  // Checks if the channel field reaches the character limit
  if (channel.length > CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT) {
    res.status(400).json({
      error: error.message.characterLimitExceeded,
      success: false,
    });
    return;
  }

  // Check if there are any commas in the title
  if (/,/.test(title)) {
    return res.status(400).send({
      error: error.message.removeCommasFromTitle,
      success: false,
    });
  }

  // Process and compute final values locally without immediately updating state
  let finalFeatures = features;
  let finalArtist = artist;
  let extractedTitle = "";
  let finalTitle = title;
  let finalFormat = "";
  let formatText = "";
  let remix = "";

  // Modified if statement to check for both standard hyphen and em dash
  if (/,|-/.test(artist)) {
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
          .replace("(", "")
          .replace(")", "")
          .trim();

        // Extract remix title
        if (formatText.toLowerCase().includes("remix")) {
          remix = formatText.toLowerCase();
        }
      } else if (titleFormatString.includes("[")) {
        formatText = removeEmojis(titleFormatString.replace("[", ""))
          .replace(extractedTitle, "")
          .replace("[", "")
          .replace("]", "")
          .trim();

        // Extract remix title
        if (formatText.toLowerCase().includes("remix")) {
          remix = formatText.toLowerCase();
        }
      }
    }

    // Process artist and features from the main part
    let artistsArray = [];

    // Split by both ',' and '&' as separators
    artistsArray = mainPart
      .split(/,|&/)
      .map((a) => a.trim())
      .filter(Boolean);

    const [firstArtist, ...otherArtists] = artistsArray;

    finalArtist = firstArtist.replaceAll("'", "") || "none"; // fallback if empty
    finalFeatures = otherArtists.join(", ") || "none";

    // If features param is provided, override finalFeatures
    if (features !== "none") {
      finalFeatures = features;
    }
  }

  // Replaces special characters in the title.
  if (extractedTitle.length) {
    finalTitle = extractedTitle
      .trim()
      .replace(/(\.|'|!|\(.*$)/g, "")
      .trim();
  } else {
    finalTitle = title
      .trim()
      .replace(/(\.|'|!|\(.*$)/g, "")
      .trim();
  }

  // If format text was found, process it.
  if (formatText.length && formatText.toLowerCase() !== "lyrics" && !formatText.toLowerCase().includes("remix")) {
    // Get standardized format name and ensure it's lowercase for the API
    finalFormat = returnComputedFormat(formatText).toLowerCase();
  } else {
    finalFormat = returnComputedFormat(format).toLowerCase();
  }

  // Error if artist includes separators but title is already specified
  if (/,|-/.test(artist)) {
    if (title !== "none") {
      return res.status(400).json({
        error: error.message.artistAndTitleAlreadyProvidedInTheArtistField,
        success: false,
      });
    }
  }

  let formatPureFormat = finalFormat.trim().toLowerCase();
  let tags: string = "";

  const slicedTitleString = finalTitle.split("\\");
  const additionalFormat = slicedTitleString[1];
  finalTitle = slicedTitleString[0];

  if (formatPureFormat === FORMAT.bassboosted) {
    // Bass Boosted
    tags = bassBoostedTags(finalArtist, finalTitle, finalFeatures, computeTikTokValue(tiktok));
  } else if (formatPureFormat === FORMAT.nightcore) {
    // Nightcore/Sped Up
    tags = nightcoreSpedUpTags(finalArtist, finalTitle, finalFeatures, computeTikTokValue(tiktok));
  } else if (formatPureFormat === FORMAT.slowedreverb) {
    // Slowed/Reverb
    tags = slowedReverbTags(finalArtist, finalTitle, finalFeatures, computeTikTokValue(tiktok));
  } else if (formatPureFormat === FORMAT.letra) {
    // Letra
    tags = letraTags(finalArtist, finalTitle, finalFeatures, computeTikTokValue(tiktok));
  } else if (formatPureFormat === FORMAT.testo) {
    // Testo
    tags = testoTags(finalArtist, finalTitle, finalFeatures, computeTikTokValue(tiktok));
  } else if (formatPureFormat === FORMAT.phonk) {
    // Phonk
    tags = phonkTags(finalArtist, finalTitle, finalFeatures, computeTikTokValue(tiktok));
  } else if (formatPureFormat === FORMAT.lyrics) {
    // Lyrics
    tags = lyricsTags(finalArtist, finalTitle, finalFeatures, computeTikTokValue(tiktok));
  } else if (formatPureFormat === FORMAT.none) {
    tags = noneTags(finalArtist, finalTitle, finalFeatures, computeTikTokValue(tiktok));
  }

  let customFormatString = "";
  let tagsToBeRemoved = "";
  let removedTags = "";

  // Checks for the '/' character in the artist field, if one was provided then we need to save it as a custom format
  if (/\//.test(artist)) {
    const validVariablesStrict = ["{a}", "{t}", "{f1}", "{f2}", "{f3}", "/custom"];
    const validVariables = ["a", "t", "f1", "f2", "f3"];

    // Check if any valid variable exists in the string.
    const hasValidVariable = validVariablesStrict.some((variable) => artist.includes(variable));

    if (!hasValidVariable) {
      return res.status(400).json({
        error: error.message.needToProvideAllValidVariables,
        success: false,
      });
    }

    if (artist.includes("/custom")) {
      // TODO: Redis stuff goes here
    }

    // Example: Rex Orange County - Pluto Projector/{a},{t}
    const customFormat = artist.split("/")[1];
    const individualFormatSplit = customFormat.split(",");

    let customFormatTags = "";

    for (const format of individualFormatSplit) {
      const containsValid = validVariables.some((v) => format.includes(v));

      if (containsValid) {
        customFormatTags += `${format},`;
      } else {
        return res.status(400).json({
          error: error.message.providedVariablesNotValid,
          success: false,
        });
      }
    }

    // Remove trailing comma
    customFormatTags = customFormatTags.slice(0, -1);

    // Store and assign tags
    customFormatString = customFormatTags;

    finalTitle = finalTitle.split("/")[0];

    removedTags = customFormatTags.replaceAll("{a}", finalArtist).replaceAll("{t}", finalTitle);

    tags = customFormatTags.replaceAll("{a}", finalArtist).replaceAll("{t}", finalTitle);
  }

  if (remix.length) {
    tags += `,${remix},${finalTitle} ${remix},${finalArtist} ${remix}`;
  }

  if (additionalFormat != undefined) {
    // Christmas
    const validAdditionalFormatTextListChristmas = ["christmas", "xmas", "noel", "yule", "christmastime"];
    // Halloween
    const validAdditionalFormatTextListHalloween = ["halloween", "spooky", "scary", "ghost"];

    // Lower case the text
    const additionalFormatLowercase = additionalFormat.toLowerCase();

    if (validAdditionalFormatTextListChristmas.includes(additionalFormatLowercase)) {
      tags += `,christmas songs,christmas music,christmas ${new Date().getFullYear()},christmas playlist`;
    } else if (validAdditionalFormatTextListHalloween.includes(additionalFormatLowercase)) {
      tags += `,halloween songs,halloween music,halloween ${new Date().getFullYear()},halloween playlist`;
    }
  }

  const currentYear = new Date().getFullYear();

  let verses = [];

  if (typeof verse === "string" && verse !== "none" && /,/.test(verse)) {
    // Splits the verse up with the , character.
    const verseSplit = verse.split(",");

    // If there's more than 3 verses then send back a error response
    if (verseSplit.length > 3) {
      return res.status(400).json({
        error: error.message.threeVersesAreOnlyAllowed,
        success: false,
      });
    }

    // Add each verse to the array
    verseSplit.forEach((verse) => verses.push(`,${verse}`));
  } else if (verse && verse !== "none") {
    verses.push(`,${verse}`);
  }

  if (verses.length) {
    tags += verses.join("").toLowerCase();
  }

  if (genre === GENRE.rap || genre === GENRE.hiphop) {
    tags += `,rap,hiphop,rap ${currentYear},rap music,rap lyrics`;
  } else if (genre === GENRE.country) {
    tags += `,country,country ${currentYear},country music,country lyrics`;
  } else if (genre === GENRE.pop) {
    tags += `,pop,pop ${currentYear},pop music,trending pop`;
  } else if (genre === GENRE.funk || genre === GENRE.phonk) {
    tags += `,phonk,funk,phonk music,phonk ${currentYear},new phonk`;
  } else if (genre === GENRE.latin) {
    tags += `,letra,latin,latin music,trending latin`;
  } else if (genre === GENRE.italian) {
    tags += `,italian lyrics,italian music,trending italian`;
  } else if (genre === GENRE.dance) {
    tags += `,dance music,dance,trending dance,dance ${new Date().getFullYear()}`;
  }

  if (shuffle === "true") {
    removedTags = shuffleTags(removedTags);
    tags = shuffleTags(tags);
  }

  if (channel !== "none") {
    removedTags += `,${channel}`.toLowerCase();
    tags += `,${channel.replaceAll(".", "")}`.toLowerCase();
  }

  tagsToBeRemoved = removeTags(finalTitle, finalArtist, finalFeatures, finalFormat.toLowerCase(), tiktok, tags);

  removedTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => {
      if (!tag) return false;

      const tagsToRemoveArray = tagsToBeRemoved.split(",").map((t) => t.trim().toLowerCase());

      return !tagsToRemoveArray.includes(tag.toLowerCase());
    })
    .join(",");

  let titles: string = "";

  const feats: string[] = finalFeatures.length
    ? finalFeatures.split(",").map((feat) => `${feat[0].toUpperCase()}${feat.substring(1)}`)
    : [];

  // Lyrics
  if (formatPureFormat === FORMAT.lyrics) {
    if (feats.includes("None")) feats.pop();
    titles += lyricsTitles(finalArtist, finalTitle, feats);
  }

  // Letra
  if (formatPureFormat === FORMAT.letra) {
    if (feats.includes("None")) feats.pop();
    titles += letraTitles(finalArtist, finalTitle, feats);
  }

  // Testo
  if (formatPureFormat === FORMAT.testo) {
    if (feats.includes("None")) feats.pop();
    titles += testoTitles(finalArtist, finalTitle, feats);
  }

  // Slowed & Reverb
  if (formatPureFormat === FORMAT.slowedreverb) {
    if (feats.includes("None")) feats.pop();
    titles += slowedReverbTitles(finalArtist, finalTitle, feats);
  }

  // Phonk
  if (formatPureFormat === FORMAT.phonk) {
    if (feats.includes("None")) feats.pop();
    titles += phonkTitles(finalArtist, finalTitle, feats);
  }

  // Bass Boosted
  if (formatPureFormat === FORMAT.bassboosted) {
    if (feats.includes("None")) feats.pop();
    titles += bassBoostedTitles(finalArtist, finalTitle, feats);
  }

  if (formatPureFormat === FORMAT.none) {
    if (feats.includes("None")) feats.pop();
    titles += noneTitles(finalArtist, finalTitle, feats);
  }

  const hashtags = [
    decodeURIComponent(finalArtist.replaceAll(" ", "")),
    decodeURIComponent(finalTitle.replaceAll(" ", "").replaceAll("'", "")),
    decodeURIComponent(computeFinalHashtags(finalFormat)),
  ];

  // Removes the last hashtag if the format is none
  if (hashtags[hashtags.length - 1] === "") {
    hashtags.pop();
  }

  const responseId = uuidv4();

  const url = urlBuilder(
    customFormatString,
    responseId,
    finalFeatures,
    example,
    shuffle,
    channel,
    source,
    customFormatString.length ? artist.trim() : finalArtist,
    tiktok,
    finalFormat,
    genre,
    verse,
    finalTitle,
    log
  );

  const webhookUrl = webhook === "none" ? process.env.DISCORD_WEBHOOK_URL! : webhook;

  if (log.toLowerCase() === "true") {
    await sendDiscordWebhook(
      customFormatString,
      tagsToBeRemoved,
      res,
      responseId,
      removedTags,
      finalFeatures,
      channel,
      webhookUrl,
      tiktok,
      finalFormat,
      finalArtist,
      finalTitle,
      tags,
      log,
      url
    );
  }

  // Send the response.
  res.status(200).json({
    success: true,
    tags: decodeURIComponent(tags.toLowerCase()),
    tagsToBeRemoved: tagsToBeRemoved.length ? decodeURIComponent(tagsToBeRemoved.toLowerCase()) : "",
    removedTags: decodeURIComponent(removedTags.toLowerCase()),
    removedTagsLength: countTagsLength(removedTags),
    title: decodeURIComponent(finalTitle.trim()),
    genre: capitalizeFirstLetter(genre),
    artist: decodeURIComponent(finalArtist.trim()),
    artistCustomFormat: customFormatString.length && `${decodeURIComponent(artist.trim())}`,
    customFormat: customFormatString,
    features: finalFeatures !== "none" ? finalFeatures.split(", ") : [],
    hashtags,
    tiktok,
    channel,
    log: log,
    extras: {
      titles: decodeURIComponent(titles),
      seo: {
        text:
          finalFeatures === "none"
            ? `${decodeURIComponent(finalArtist)}=${decodeURIComponent(finalTitle)}=${decodeURIComponent(
                finalArtist
              )} ${decodeURIComponent(finalTitle)} ${computeFinalHashtags(finalFormat)}=${decodeURIComponent(
                finalTitle
              )} ${computeFinalHashtags(finalFormat)}=${decodeURIComponent(finalTitle)} ${decodeURIComponent(
                finalArtist
              )}=${decodeURIComponent(finalArtist)} ${decodeURIComponent(finalTitle)}`
            : `${decodeURIComponent(finalArtist)}, ${decodeURIComponent(finalFeatures)}=${decodeURIComponent(
                finalTitle
              )}=${decodeURIComponent(finalArtist)}, ${decodeURIComponent(finalFeatures)} ${decodeURIComponent(
                finalTitle
              )} ${computeFinalHashtags(finalFormat)}=${decodeURIComponent(finalTitle)} ${computeFinalHashtags(
                finalFormat
              )}=${decodeURIComponent(finalTitle)} ${decodeURIComponent(finalArtist)}, ${decodeURIComponent(
                finalFeatures
              )}=${decodeURIComponent(finalArtist)}, ${decodeURIComponent(finalFeatures)} ${decodeURIComponent(
                finalTitle
              )}`,
      },
      array: {
        removedTags: decodeURIComponent(removedTags).toLowerCase().split(","),
        titles: decodeURIComponent(titles).split("="),
        tags: decodeURIComponent(tags).toLowerCase().split(","),
      },
    },
    url,
    responseId,
    length: countTagsLength(tags),
  });
}
