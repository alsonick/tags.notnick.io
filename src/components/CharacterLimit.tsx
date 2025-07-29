interface Props {
  text?: string;
  count?: number;
  limit: number;
}

export const CharacterLimit = (props: Props) => {
  const currentCount = props.text?.length ?? props.count ?? 0;
  const color = currentCount > props.limit ? "text-red-500" : "text-gray-600";
  const fontWeight = currentCount > props.limit ? "500" : "normal";

  return (
    <p
      className={`text-xs ${color}`}
      style={{
        color,
        fontWeight,
      }}
    >
      {currentCount}/{props.limit}
    </p>
  );
};
