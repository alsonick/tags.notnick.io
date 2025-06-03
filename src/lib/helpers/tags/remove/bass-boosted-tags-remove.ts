import { countTagsLength } from "@/lib/count-tags-length";

export const bassBoostedTagsRemove = (
  title: string,
  artist: string,
  features: string,
  tiktok: string,
  tags: string
): string => {
  const tagsLength = countTagsLength(tags);
  let tagsToBeRemoved = "";
  let del: string[] = [];

  if (features.length && tiktok === "false") {
    let feats = features.split(",").map((feat) => feat.trim());
    const firstFeat = feats[0];

    if (tagsLength > 800) {
    } else if (tagsLength > 700) {
    } else if (tagsLength > 600) {
      del =
        `${artist} - ${title},${title} ${firstFeat} bass,${title} ${firstFeat} bass boosted,${artist} - ${title} bass boosted,${firstFeat} ${title} bass`
          .toLowerCase()
          .split(",");

      const tagArray = tags.toLowerCase().split(",");

      for (const formatTag of del) {
        if (tagArray.includes(formatTag.trim())) {
          tagsToBeRemoved += `${formatTag.trim()},`;
        }
      }

      return tagsToBeRemoved.slice(0, -1);
    } else if (tags.length > 500) {
    }
  }

  return tagsToBeRemoved;
};
