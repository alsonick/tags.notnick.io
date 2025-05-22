export const shuffleTags = (tagsString: string): string => {
  if (!tagsString) {
    return "";
  }

  const cleanedTags = tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  if (cleanedTags.length === 0) {
    return "";
  }

  const shuffledArray = [...cleanedTags];

  let currentIndex = shuffledArray.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray.join(",");
};
