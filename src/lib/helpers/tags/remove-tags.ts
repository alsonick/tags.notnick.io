export const removeTags = (
  title: string,
  artist: string,
  features: string,
  format: string,
  tiktok: string,
  tags: string
): string => {
  let tagsToBeRemoved = "";
  let del: string[] = [];
  // Lyrics
  if (format === "lyrics") {
    // Tags to remove if no features are included
    if (features.length === 0 && tiktok === "false") {
      if (tags.length > 800) {
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

        return tagsToBeRemoved.slice(0, -1); // Remove trailing comma
      } else if (tags.length > 500) {
        del =
          `lyrics ${artist},${artist} lyrics,lyrics ${title} ${artist},${title} lyrics ${artist}`
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

    // Tags to remove if features are included
    if (features.length && tiktok === "false") {
      if (tags.length > 500) {
        // Features
        let feats = features.split(",").map((feat) => feat.trim());
        // First feat
        const firstFeat = feats[0];

        del =
          `${firstFeat} lyrics,lyrics ${firstFeat} ${title},${title} lyrics ${artist},${artist} lyrics,lyrics ${artist},${title} lyric video`
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
  }

  // Slowed
  if (format === "slowed") {
    // Tags to remove if no features are included
    if (features.length === 0 && tiktok === "false") {
      if (tags.length > 500) {
      } else if (tags.length > 600) {
      } else if (tags.length > 700) {
      }
    }
  }

  return tagsToBeRemoved;
};
