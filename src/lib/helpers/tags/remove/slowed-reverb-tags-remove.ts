import { countTagsLength } from "@/lib/count-tags-length";

export const slowedReverbTagsRemove = (
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
    if (tagsLength > 900) {
    } else if (tagsLength > 700) {
      del =
        `${artist} - ${title} slowed,${artist} - ${title},${artist} ${title} slowed and reverb,${artist} - ${title} slowed reverb`
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
        `${artist} - ${title} slowed reverb,${artist} - ${title} slowed,${artist} - ${title}`
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
      del = `${artist} - ${title},${artist} - ${title} slowed`
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

  if (features.length && tiktok === "false") {
    let feats = features.split(",").map((feat) => feat.trim());
    const firstFeat = feats[0];

    if (tagsLength > 800) {
    } else if (tagsLength > 700) {
    } else if (tagsLength > 600) {
      del =
        `${artist} - ${title} slowed,${artist} - ${title} slowed reverb,${firstFeat} slowed,${firstFeat} ${title},${artist} - ${title}`
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
        `${artist} - ${title},${firstFeat} slowed,${firstFeat} ${title} slowed reverb,${firstFeat} ${title}`
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
