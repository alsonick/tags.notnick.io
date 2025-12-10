import { Endpoint } from "@/types/documentation/endpoint";
import { generateRandomId } from "../generate-random-id";

export const ENDPOINTS: Endpoint[] = [
  { id: generateRandomId(), method: "GET", endpoint: "https://tags.notnick.io/api/v1/generate" },
  { id: generateRandomId(), method: "GET", endpoint: "https://tags.notnick.io/api/v1/length" },
];
