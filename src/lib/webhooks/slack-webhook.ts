import { computeFinalHashtags } from "../compute-final-hashtag";
import { countTagsLength } from "../count-tags-length";
import { NextApiResponse } from "next";
import { error } from "../error";

export const slackWebhook = async (
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
  const safeText = (val: string | number) => (val && val.toString().trim().length ? val.toString() : "none");

  const decodeSafe = (str: string) => {
    try {
      return decodeURIComponent(str);
    } catch {
      return str;
    }
  };

  const fields1 = [
    { type: "mrkdwn", text: `*Artist:*\n${safeText(decodeSafe(artist.trim()))}` },
    { type: "mrkdwn", text: `*Title:*\n${safeText(decodeSafe(title.trim()))}` },
    { type: "mrkdwn", text: `*Tiktok:*\n${safeText(tiktok)}` },
    {
      type: "mrkdwn",
      text: `*Format:*\n${safeText(computeFinalHashtags(format).replace("SlowedReverb", "Slowed & Reverb"))}`,
    },
    { type: "mrkdwn", text: `*Channel:*\n${safeText(channel)}` },
    {
      type: "mrkdwn",
      text: `*Length:*\n${safeText(removedTags.length ? countTagsLength(removedTags) : countTagsLength(tags))}`,
    },
    { type: "mrkdwn", text: `*Features:*\n${safeText(features.length ? features : "none")}` },
    { type: "mrkdwn", text: `*Log:*\n${safeText(log)}` },
    { type: "mrkdwn", text: `*Count:*\n${safeText(features === "none" ? 0 : features.split(",").length)}` },
  ];

  const fields2 = [
    { type: "mrkdwn", text: `*Tags:*\n${safeText(decodeSafe(tags.toLowerCase()))}` },
    { type: "mrkdwn", text: `*Link:*\n<https://tags.notnick.io${url}|Open Link>` },
    { type: "mrkdwn", text: `*Removed:*\n${safeText(tagsToBeRemoved.length ? tagsToBeRemoved : "none")}` },
    { type: "mrkdwn", text: `*Custom:*\n${safeText(customFormatString.length ? customFormatString : "none")}` },
  ];

  const messageBlocks = [
    {
      type: "section",
      text: { type: "mrkdwn", text: `*${decodeSafe(artist)} - ${decodeSafe(title)}*` },
    },
    { type: "divider" },
    { type: "section", fields: fields1 },
    { type: "section", fields: fields2 },
  ];

  const hook1 = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `${decodeSafe(artist)} - ${decodeSafe(title)}`,
      blocks: messageBlocks,
    }),
  });

  if (!hook1.ok) {
    return res.json({
      success: false,
      error: error.message.somethingWentWrong,
    });
  }
};
