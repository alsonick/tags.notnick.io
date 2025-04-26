export const returnComputedFormat = (format: string) => {
  switch (format.toLowerCase()) {
    case "bassboosted":
      return "bassboosted";
    case "bass boosted":
      return "bassboosted";
    case "nightcore":
      return "nightcore";
    case "slowed":
      return "Slowed";
    case "slowed & reverb":
      return "slowedreverb";
    case "slowedreverb":
      return "slowedreverb";
    case "letra":
      return "letra";
    default:
      return "lyrics";
  }
};
