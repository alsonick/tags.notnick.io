export const urlBuilder = (
  discordwebhook: string,
  customFormat: string,
  features: string,
  shuffle: string,
  channel: string,
  artist: string,
  tiktok: string,
  format: string,
  genre: string,
  verse: string,
  title: string,
  log: string
): string => {
  return `/api/generate?title=${encodeURIComponent(
    customFormat.length ? "none" : encodeURIComponent(title)
  )}&artist=${encodeURIComponent(
    customFormat.length ? encodeURIComponent(`${artist.trim()}`) : encodeURIComponent(artist)
  )}&features=${encodeURIComponent(features)}&tiktok=${
    tiktok === "" ? "false" : tiktok !== "true" ? "false" : "true"
  }&format=${format}&channel=${channel ? encodeURIComponent(channel) : "none"}&shuffle=${
    shuffle || shuffle === "true" ? "true" : "false"
  }&genre=${encodeURIComponent(genre.toLowerCase())}&verse=${encodeURIComponent(verse.toLowerCase())}&custom=${
    customFormat ? "true" : "false"
  }&log=${log === "true" ? log : "false"}`;
};
