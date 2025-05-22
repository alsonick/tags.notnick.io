export const countTagsLength = (tags: string): number => {
  if (!tags) {
    return 0;
  }
  const tagsArray = tags.split(",");
  let totalLength = 0;
  let validTagCount = 0;

  for (const tag of tagsArray) {
    const trimmedTag = tag.trim();
    if (trimmedTag.length === 0) {
      continue;
    }

    let tagLength = trimmedTag.length;
    if (trimmedTag.includes(" ")) {
      tagLength += 2;
    }

    totalLength += tagLength;
    validTagCount++;
  }

  if (validTagCount > 1) {
    totalLength += validTagCount - 1;
  }

  return totalLength;
};
