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
        let feats = features.split(",").map((feat) => feat.trim());
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

        return tagsToBeRemoved.slice(0, -1);
      }
    }
  }

  // Slowed
  if (format === "slowedreverb") {
    // Tags to remove if no features are included
    if (features.length === 0 && tiktok === "false") {
      if (tags.length > 900) {
      } else if (tags.length > 700) {
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
      } else if (tags.length > 600) {
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
      } else if (tags.length > 500) {
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

      if (tags.length > 800) {
      } else if (tags.length > 700) {
      } else if (tags.length > 600) {
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

      if (tags.length > 800) {
      } else if (tags.length > 700) {
      } else if (tags.length > 600) {
        console.log(`${firstFeat} ${title} bass`.toLowerCase());
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
