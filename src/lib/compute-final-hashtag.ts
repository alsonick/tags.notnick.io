export const computeFinalHashtags = (hashtag: string): string => {
  switch (hashtag.toLowerCase()) {
    case "slowedreverb":
      return "SlowedReverb";
    case "slowed":
      return "SlowedReverb";
    case "bassboosted":
      return "BassBoosted";
    case "letra":
      return "Letra";
    case "phonk":
      return "Phonk";
    case "nightcore":
      return "Nightcore";
    case "testo":
      return "Testo";
    case "none":
      return "";
    default:
      return "Lyrics";
  }
};
