export const returnComputedFormat = (format: string) => {
  switch (format.toLowerCase()) {
    case "bassboosted":
      return "bassboosted";
    case "bass boosted":
      return "bassboosted";
    case "nightcore":
      return "nightcore";
    case "slowed":
      return "slowedreverb";
    case "reverb":
      return "slowedreverb";
    case "slowed & reverb":
      return "slowedreverb";
    case "slowedreverb":
      return "slowedreverb";
    case "phonk":
      return "phonk";
    case "letra":
      return "letra";
    default:
      return "lyrics";
  }
};
