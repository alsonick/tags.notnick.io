export const removeEmojis = (text: string) => {
  return text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])+|\p{Extended_Pictographic}/gu,
    ""
  );
};
