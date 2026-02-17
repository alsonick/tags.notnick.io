import { FiCopy, FiEdit } from 'react-icons/fi';
import { success } from '@/lib/success';
import { SetStateAction } from 'react';
import { toast } from 'sonner';
import copy from 'copy-to-clipboard';
import { Button } from '../Button';

interface Props {
  setTitles: (value: SetStateAction<string[]>) => void;
  originalTitles: string[];
  titles: string[];
}

export const SuggestedTitlesSection = (props: Props) => {
  return (
    <section className="flex flex-col mt-4 border-t pt-4">
      <h3 className="text-2xl font-medium">Suggested titles:</h3>
      <p className="mb-6 text-gray-800">Titles in different formats you can use.</p>
      {props.titles.map((title) => (
        <div className="flex items-center justify-between w-full mt-4" key={title}>
          <h4 className="text-xl">{title}</h4>
          <Button
            type="button"
            title="Copy"
            onClick={() => {
              // Copy the current title string to the clipboard
              copy(title);

              // Show a success toast notification confirming the copy action
              toast.success(success.message.titleCopiedToClipboard);
            }}
          >
            Copy <FiCopy className="ml-2 hover:scale-110 duration-150" />
          </Button>
        </div>
      ))}
      <div className="flex items-center w-full mt-4">
        <div className="flex items-center ml-auto">
          <Button
            title="Uppercase"
            type="button"
            onClick={() => {
              // Convert all titles in the array to uppercase
              const uppercaseTitles = props.titles.map((title) => title.toUpperCase());

              // Check if the transformed array is the same as the current titles
              // (Prevents unnecessary re-renders / state updates)
              if (uppercaseTitles === props.titles) {
                return;
              }

              // Update state only if there was a change
              props.setTitles(uppercaseTitles);
            }}
          >
            Uppercase <FiEdit className="ml-2 hover:scale-110 duration-150" />
          </Button>
          <div className="ml-2">
            <Button
              title="Lowercase"
              type="button"
              onClick={() => {
                // Create a new array where every title is converted to lowercase
                const lowercaseTitles = props.titles.map((title) => title.toLowerCase());

                // Check if the new array is exactly the same reference as the old one
                // This will almost always be false, since .map() creates a new array
                if (lowercaseTitles === props.titles) {
                  return; // Skip updating if they are the same (but in practice, this won't trigger)
                }

                // Update state with the lowercase version of the titles
                props.setTitles(lowercaseTitles);
              }}
            >
              Lowercase <FiEdit className="ml-2 hover:scale-110 duration-150" />
            </Button>
          </div>
          <div className="ml-2">
            <Button
              title="Original"
              type="button"
              onClick={() => {
                // Check if originalTitles and titles are the same array reference
                if (props.originalTitles === props.titles) {
                  return; // Do nothing if they're the same reference
                }

                // Otherwise, update titles state with the originalTitles array
                props.setTitles(props.originalTitles);
              }}
            >
              Original <FiEdit className="ml-2 hover:scale-110 duration-150" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
