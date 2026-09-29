import { ResultSection } from './ResultSection';
import { success } from '@/lib/success';
import { FiCopy } from 'react-icons/fi';
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
    <ResultSection
      title="Suggested titles"
      description="Titles in different formats you can use."
      actions={
        <div className="flex items-center gap-2">
          <Button
            title="Uppercase"
            type="button"
            variant="secondary"
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
            Uppercase
          </Button>
          <Button
            title="Lowercase"
            type="button"
            variant="secondary"
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
            Lowercase
          </Button>
          <Button
            title="Original"
            type="button"
            variant="secondary"
            onClick={() => {
              // Check if originalTitles and titles are the same array reference
              if (props.originalTitles === props.titles) {
                return; // Do nothing if they're the same reference
              }

              // Otherwise, update titles state with the originalTitles array
              props.setTitles(props.originalTitles);
            }}
          >
            Original
          </Button>
        </div>
      }
    >
      <div className="-my-1 divide-y">
        {props.titles.map((title) => (
          <div className="flex items-center justify-between gap-4 py-2.5" key={title}>
            <h4 className="text-base text-gray-900 dark:text-gray-100">{title}</h4>
            <Button
              type="button"
              title="Copy"
              variant="secondary"
              onClick={() => {
                // Copy the current title string to the clipboard
                copy(title);

                // Show a success toast notification confirming the copy action
                toast.success(success.message.titleCopiedToClipboard);
              }}
            >
              Copy <FiCopy />
            </Button>
          </div>
        ))}
      </div>
    </ResultSection>
  );
};
