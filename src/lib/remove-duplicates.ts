export const removeDuplicates = (input: string): string => {
  const items = input.split(",");
  const trimmedItems = items.map((item) => item.trim());
  const uniqueItems = [...new Set(trimmedItems)];
  return uniqueItems.join(",");
};
