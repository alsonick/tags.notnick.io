import { Key, SetStateAction } from "react";
import { toast } from "sonner";
import { FiX } from "react-icons/fi";
import { TagText } from "./TagText";

interface Props {
  setTags?: (value: SetStateAction<string[]>) => void;
  key?: Key | null | undefined;
  deletable: boolean;
  tags?: string[];
  tag: string;
}

export const Tag = (props: Props) => {
  return (
    <>
      {props.deletable ? (
        <div
          key={props.tag}
          className="flex items-center border p-2 px-4 rounded-lg
                            hover:cursor-pointer w-fit duration-300 hover:shadow-lg"
          title={`Delete ${props.tag} tag`}
          onClick={() => {
            // Create a new array of tags excluding the one to be removed
            // `filter` returns a new array containing only tags that are not equal to `tag`
            const filtered = props.tags ? props.tags.filter((t) => t !== props.tag) : [];

            // Update the state with the filtered array
            // This effectively removes the specified tag from the list
            props.setTags && props.setTags(filtered);

            // Notify the user that the tag was deleted
            toast.success(`'${props.tag}' tag deleted.`);
          }}
        >
          <TagText text={props.tag} />
          <FiX className="text-lg ml-1 hover:scale-110 duration-150" />
        </div>
      ) : (
        <div key={props.tag} className="flex items-center border p-2 px-4 rounded-lg w-fit">
          <TagText text={props.tag} />
        </div>
      )}
    </>
  );
};
