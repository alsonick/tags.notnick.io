import { computeFinalHashtags } from "../compute-final-hashtag";
import { countTagsLength } from "../count-tags-length";
import { NextApiResponse } from "next";
import { error } from "../error";

export const discordWebhook = async (
  customFormatString: string,
  tagsToBeRemoved: string,
  res: NextApiResponse,
  removedTags: string,
  features: string,
  channel: string,
  webhook: string,
  tiktok: string,
  format: string,
  artist: string,
  title: string,
  tags: string,
  log: string,
  url: string
) => {
  const hook1 = await fetch(webhook, {
    method: "POST",
    body: JSON.stringify({
      embeds: [
        {
          author: {
            name: `${decodeURIComponent(artist)} - ${decodeURIComponent(title)}`,
          },
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: "Artist:",
              value: decodeURIComponent(artist.trim()),
              inline: true,
            },
            {
              name: "Title:",
              value: decodeURIComponent(title.trim()),
              inline: true,
            },
            {
              name: "Tiktok:",
              value: tiktok,
              inline: true,
            },
            {
              name: "Format:",
              value: computeFinalHashtags(format),
              inline: true,
            },
            {
              name: "Channel:",
              value: channel,
              inline: true,
            },
            {
              name: "Length:",
              value: removedTags.length ? countTagsLength(removedTags) : countTagsLength(tags),
              inline: true,
            },
            {
              name: "Features:",
              value: features.length ? features : "none",
              inline: true,
            },
            {
              name: "Log:",
              value: log,
              inline: true,
            },
            {
              name: "Count:",
              value: features === "none" ? 0 : features.split(",").length,
              inline: true,
            },
            {
              name: "Tags:",
              value: decodeURIComponent(tags.toLowerCase()),
            },
            {
              name: "Link:",
              value: `https://tags.notnick.io${url}`,
            },
            {
              name: "Removed:",
              value: tagsToBeRemoved.length ? tagsToBeRemoved : "none",
            },
            {
              name: "Custom:",
              value: customFormatString.length ? customFormatString : "none",
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
    return res.json({
      success: false,
      error: error.message.somethingWentWrong,
    });
  }
};
