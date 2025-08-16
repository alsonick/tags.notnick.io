export const urlBuilder = (
  customFormat: string,
  requestId: string,
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
  return `/api/generate?title=${encodeURIComponent(customFormat.length ? "none" : title)}&artist=${encodeURIComponent(
    customFormat.length ? artist.trim() : artist
  )}&features=${encodeURIComponent(features)}&tiktok=${tiktok === "true"}&format=${encodeURIComponent(
    format
  )}&channel=${channel ? encodeURIComponent(channel) : "none"}&shuffle=${shuffle === "true"}&genre=${encodeURIComponent(
    genre.toLowerCase()
  )}&verse=${encodeURIComponent(verse.toLowerCase())}&custom=${customFormat ? "true" : "false"}&log=${
    log.toLowerCase() === "true" ? "true" : "false"
  }&request=${requestId}`;
};
