interface Props {
  text: string;
}

export const TagText = (props: Props) => {
  return <p className="text-base text-gray-800 dark:text-gray-200">{props.text}</p>;
};
