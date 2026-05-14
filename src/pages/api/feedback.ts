import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body;

  if (!body) {
    return res
      .status(400)
      .send({ success: false, error: "Please include the body." });
  }

  interface Body {
    feedback?: string | undefined;
    category?: string | undefined;
    email?: string | undefined;
  }

  const { email, category, feedback } = body as Body;

  const webhookUrl = process.env.DISCORD_WEBHOOK_FEEDBACK_URL;

  if (!webhookUrl) {
    return res
      .status(500)
      .send({ success: false, error: "Something went wrong." });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Lyrics Tags Generator Feedback",
            color: 0x30d158,
            fields: [
              {
                name: "Email",
                value: email ?? "Not provided",
              },
              {
                name: "Category",
                value: category ?? "Not provided",
              },
              {
                name: "Feedback",
                value: feedback ?? "Not provided",
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (response.status >= 400) {
      return res
        .status(502)
        .send({ success: false, error: "Something went wrong." });
    }

    return res.status(200).send({ success: true });
  } catch {
    return res
      .status(500)
      .send({ success: false, error: "Something went wrong." });
  }
}
