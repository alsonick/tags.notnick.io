import type { NextApiRequest, NextApiResponse } from "next";
import { success } from "@/lib/success";
import { error } from "@/lib/error";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: error.message.methodNotAllowed });
  }

  // Send the response
  res.status(200).json({ success });
}
