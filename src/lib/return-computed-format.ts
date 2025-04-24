export const returnComputedFormat = (format: string) => {
  switch (format) {
    case "bassboosted":
      return "BassBoosted";
    case "nightcore":
      return "Nightcore";
    case "slowedreverb":
      return "Slowed";
    case "letra":
      return "Letra";
    default:
      return "Lyrics";
  }
};
