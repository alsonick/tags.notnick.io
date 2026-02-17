import { success } from "@/lib/success";
import { FiCopy } from "react-icons/fi";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import { Button } from "../Button";

interface Props {
  hashtags: string[];
}

export const HashtagsSection = (props: Props) => {
  return (
    <section className="mt-4 flex flex-col border-t pt-4">
      <h3 className="text-2xl font-medium">Hashtags:</h3>
      <div className="flex items-center justify-between w-full">
        <div className="flex">
          {props.hashtags.map((hashtag) => (
            <p key={hashtag} className="text-xl mr-4">
              #{hashtag}
            </p>
          ))}
        </div>
        <Button
          type="button"
          title="Copy "
          onClick={() => {
            // Take the list of hashtags from the API response (if available)
            // and prepend "#" to each one
            const hashtagArray = props.hashtags.map((hashtag) => `#${hashtag}`);

            // Join the hashtags into a single string separated by spaces
            // Example: ["#music", "#lyrics"] → "#music #lyrics"
            const textToCopy = `${hashtagArray?.join(" ")}`;

            // Copy the final hashtag string to the clipboard
            copy(textToCopy);

            // Show a success toast to let the user know copying worked
            toast.success(success.message.hashtagsCopiedToClipboard);
          }}
        >
          Copy <FiCopy className="ml-2 hover:scale-110 duration-150" />
        </Button>
      </div>
    </section>
  );
};
