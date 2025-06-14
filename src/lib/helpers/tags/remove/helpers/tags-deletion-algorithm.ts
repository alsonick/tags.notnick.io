import { countTagsLength } from "@/lib/count-tags-length";

export const tagsDeletionAlgorithm = (remove: string[], tags: string): string => {
  let tagsArray = tags.split(",").map((tag) => tag.trim());

  let tagsLength = countTagsLength(tags);
  let currentTagsLength = tagsLength;
  let tagsToBeRemoved = "";

  if (currentTagsLength <= 500) {
    return "";
  }

  const currentTagsSet = new Set(tagsArray);

  for (const tagPatternToRemove of remove) {
    if (currentTagsSet.has(tagPatternToRemove)) {
      const tagIndex = tagsArray.indexOf(tagPatternToRemove);

      if (tagIndex > -1) {
        const removedTag = tagsArray[tagIndex];

        tagsArray.splice(tagIndex, 1);

        currentTagsSet.delete(removedTag);

        currentTagsLength = countTagsLength(tagsArray.join(","));

        tagsToBeRemoved += `${removedTag},`;
      }
    }

    if (currentTagsLength <= 500) {
      break;
    }
  }

  tags = tagsArray.join(",");
  tagsLength = tags.length;

  return tagsToBeRemoved.slice(0, -1);
};
