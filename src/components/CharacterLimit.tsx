interface Props {
  text: string;
  limit: number;
}

export const CharacterLimit = (props: Props) => {
  return (
    <p
      className="text-xs"
      style={{
        color: props.text.length > props.limit ? "red" : "black",
        fontWeight: props.text.length > props.limit ? "500" : "normal",
      }}
    >
      {props.text.length}/{props.limit}
    </p>
  );
};
