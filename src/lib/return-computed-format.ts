export const returnComputedFormat = (format: string) => {
  switch (format.toLowerCase()) {
    case "bassboosted":
      return "BassBoosted";
    case "nightcore":
      return "Nightcore";
    case "slowed":
      return "Slowed";
    case "slowedreverb":
      return "Slowed";
    case "letra":
      return "Letra";
    default:
      return "Lyrics";
  }
};
