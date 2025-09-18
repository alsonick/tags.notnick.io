import type { NextApiRequest, NextApiResponse } from "next";
import { countTagsLength } from "@/lib/count-tags-length";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const tags: string = req.query.tags as string;

  if (!tags) {
    return res.status(400).json({
      error: "Please provide all the required fields.",
      success: false,
    });
  }

  if (!tags.includes(",")) {
    return res.status(400).json({
      error: "Please provide tags separated by commas.",
      success: false,
    });
  }

  return res.status(200).json({ success: true, length: countTagsLength(tags) });
}
