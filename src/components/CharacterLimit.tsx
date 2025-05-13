interface Props {
  text?: string;
  count?: number;
  limit: number;
}

export const CharacterLimit = (props: Props) => {
  // Determine the current count (text length or provided count)
  const currentCount = props.text?.length ?? props.count ?? 0;

  // Determine color based on current count exceeding limit
  const color = currentCount > props.limit ? "red" : "black";

  // Determine font weight based on current count exceeding limit
  const fontWeight = currentCount > props.limit ? "500" : "normal";

  return (
    <p
      className="text-xs"
      style={{
        color,
        fontWeight,
      }}
    >
      {currentCount}/{props.limit}
    </p>
  );
};
