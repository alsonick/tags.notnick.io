export const capitalizeFirstLetter = (str: string): string => {
  // Check if string is empty or null/undefined
  if (!str || typeof str !== "string" || str.length === 0) {
    return str;
  }

  // Uppercase the first character and concatenate with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
