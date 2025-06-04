import type { NextApiRequest, NextApiResponse } from "next";
import { countTagsLength } from "@/lib/count-tags-length";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get the query parameters
  const tags: string = req.query.tags as string;

  // Checks if the length query isn't provided.
  if (!tags) {
    return res.status(400).json({
      error: "Please provide all the required fields.",
      success: false,
    });
  }

  // Checks if the query string doesn't contain any commas.
  if (!tags.includes(",")) {
    return res.status(400).json({
      error: "Please provide tags separated by commas.",
      success: false,
    });
  }

  // Send the response.
  return res.status(200).send(countTagsLength(tags));
}
