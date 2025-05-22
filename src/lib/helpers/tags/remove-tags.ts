import { countTagsLength } from "@/lib/count-tags-length";

export const removeTags = (
  title: string,
  artist: string,
  features: string,
  format: string,
  tiktok: string,
  tags: string
): string => {
  const tagsLength = countTagsLength(tags);
  let tagsToBeRemoved = "";
  let del: string[] = [];

  // Lyrics
  if (format === "lyrics") {
    // Tags to remove if no features are included
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

        return tagsToBeRemoved.slice(0, -1); // Remove trailing comma
      } else if (tagsLength > 600) {
        del =
          `lyrics ${artist},${artist} lyrics,lyrics ${title} ${artist},${title} lyrics ${artist},${title} lyric video`
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

    // Tags to remove if features are included
    if (features !== "none" && tiktok === "false") {
      if (tagsLength > 500) {
        let feats = features.split(",").map((feat) => feat.trim());
        const firstFeat = feats[0];

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
  }

  // Slowed
  if (format === "slowedreverb") {
    // Tags to remove if no features are included
    if (features === "none" && tiktok === "false") {
      if (tagsLength > 900) {
        // do something here
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
          `${artist} - ${title} slowed,${artist} - ${title} slowed reverb,${firstFeat} slowed,${firstFeat} ${title}`
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
  }

  // Bass Boosted
  if (format === "bassboosted") {
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
  }

  return tagsToBeRemoved;
};
