import { success } from "@/lib/success";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import { Button } from "../Button";

interface Props {
  seoText: string;
}

export const SeoKeywordsSection = (props: Props) => {
  return (
    <section className="mt-4 flex flex-col border-t pt-4">
      <h3 className="text-2xl font-medium">Seo keywords:</h3>
      <p className="mb-6 text-gray-800">Typically added at the end of your YouTube description.</p>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          {props.seoText.split("=").map((text) => (
            <p className="text-xl mb-2">{text}</p>
          ))}
        </div>
      </div>
      <div className="ml-auto">
        <Button
          type="button"
          title="Copy"
          onClick={() => {
            // Copy the SEO text to the clipboard
            // Replace all "=" characters with line breaks ("\n")
            // so the copied text is formatted nicely
            copy(props.seoText.replaceAll("=", "\n"));

            // Show a success toast to confirm the text was copied
            toast.success(success.message.copied);
          }}
        >
          Copy <FiCopy className="ml-2 hover:scale-110 duration-150" />
        </Button>
      </div>
    </section>
  );
};
