import { countTagsLength } from "@/lib/count-tags-length";

export const lyricsTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  const tagsLength = countTagsLength(tags);
  let tagsToBeRemoved = "";
  let del: string[] = [];

  if (features === "none" && tiktok === "false") {
    if (tagsLength > 800) {
      del =
        `${title} lyrics ${artist},lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title} ${artist},${title} lyric video,${artist} lyrics ${title},${artist},lyrics`
          .toLowerCase()
          .split(",");

      const tagArray = tags.toLowerCase().split(",");

      for (const formatTag of del) {
        if (tagArray.includes(formatTag.trim())) {
          tagsToBeRemoved += `${formatTag.trim()},`;
        }
      }

      return tagsToBeRemoved.slice(0, -1);
    } else if (tagsLength > 600) {
      del =
        `lyrics ${artist},${artist} lyrics,lyrics ${title} ${artist},${title} lyrics ${artist},${title} lyric video,${artist} lyrics ${title}`
          .toLowerCase()
          .split(",");

      const tagArray = tags.toLowerCase().split(",");
      for (const formatTag of del) {
        if (tagArray.includes(formatTag.trim())) {
          tagsToBeRemoved += `${formatTag.trim()},`;
        }
      }

      return tagsToBeRemoved.slice(0, -1); // Remove trailing comma
    } else if (tagsLength > 500) {
      del = `lyrics ${artist},${artist} lyrics,${title} lyrics ${artist}`
        .toLowerCase()
        .split(",");

      const tagArray = tags.toLowerCase().split(",");
      for (const formatTag of del) {
        if (tagArray.includes(formatTag.trim())) {
          tagsToBeRemoved += `${formatTag.trim()},`;
        }
      }

      return tagsToBeRemoved.slice(0, -1); // Remove trailing comma
    }
  }

  if (features !== "none" && tiktok === "false") {
    let feats = features.split(",").map((feat) => feat.trim());
    const firstFeat = feats[0];
    const secondFeat = feats[1];

    if (tagsLength > 600) {
      del =
        `${firstFeat} lyrics,lyrics ${firstFeat} ${title},${title} lyrics ${artist},lyrics ${artist},${artist} lyrics,${title} lyric video,lyrics,lyrics ${secondFeat},${firstFeat} lyrics`
          .toLowerCase()
          .split(",");

      const tagArray = tags.toLowerCase().split(",");
      for (const formatTag of del) {
        if (tagArray.includes(formatTag.trim())) {
          tagsToBeRemoved += `${formatTag.trim()},`;
        }
      }

      return tagsToBeRemoved.slice(0, -1);
    } else if (tagsLength > 500) {
      del =
        `${firstFeat} lyrics,lyrics ${firstFeat} ${title},${title} lyrics ${artist}`
          .toLowerCase()
          .split(",");

      const tagArray = tags.toLowerCase().split(",");
      for (const formatTag of del) {
        if (tagArray.includes(formatTag.trim())) {
          tagsToBeRemoved += `${formatTag.trim()},`;
        }
      }

      return tagsToBeRemoved.slice(0, -1);
    }
  }

  return tagsToBeRemoved;
};
