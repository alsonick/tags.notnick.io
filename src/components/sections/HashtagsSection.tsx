import { ResultSection } from './ResultSection';
import { success } from '@/lib/success';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'sonner';
import copy from 'copy-to-clipboard';
import { Button } from '../Button';

interface Props {
  hashtags: string[];
}

export const HashtagsSection = (props: Props) => {
  return (
    <ResultSection
      title="Hashtags"
      actions={
        <Button
          type="button"
          title="Copy"
          variant="secondary"
          onClick={() => {
            // Take the list of hashtags from the API response (if available)
            // and prepend "#" to each one
            const hashtagArray = props.hashtags.map((hashtag) => `#${hashtag}`);

            // Join the hashtags into a single string separated by spaces
            // Example: ["#music", "#lyrics"] → "#music #lyrics"
            const textToCopy = `${hashtagArray?.join(' ')}`;

            // Copy the final hashtag string to the clipboard
            copy(textToCopy);

            // Show a success toast to let the user know copying worked
            toast.success(success.message.hashtagsCopiedToClipboard);
          }}
        >
          Copy <FiCopy />
        </Button>
      }
    >
      <div className="flex flex-wrap gap-2">
        {props.hashtags.map((hashtag) => (
          <p
            key={hashtag}
            className="rounded-full bg-brand-50 px-3 py-1 text-base font-medium text-brand-800 dark:bg-brand-500/10 dark:text-brand-400"
          >
            #{hashtag}
          </p>
        ))}
      </div>
    </ResultSection>
  );
};
