import { ResultSection } from './ResultSection';
import { success } from '@/lib/success';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'sonner';
import copy from 'copy-to-clipboard';
import { Button } from '../Button';

interface Props {
  seoText: string;
}

export const SeoKeywordsSection = (props: Props) => {
  return (
    <ResultSection
      title="SEO keywords"
      description="Typically added at the end of your YouTube description."
      actions={
        <Button
          type="button"
          title="Copy"
          variant="secondary"
          onClick={() => {
            // Copy the SEO text to the clipboard
            // Replace all "=" characters with line breaks ("\n")
            // so the copied text is formatted nicely
            copy(props.seoText.replaceAll('=', '\n'));

            // Show a success toast to confirm the text was copied
            toast.success(success.message.keywordsCopiedToClipboard);
          }}
        >
          Copy <FiCopy />
        </Button>
      }
    >
      <div className="flex flex-col gap-1.5 rounded-lg bg-gray-50 px-4 py-3 dark:bg-neutral-900">
        {props.seoText.split('=').map((text, index) => (
          <p className="text-base text-gray-800 dark:text-gray-200" key={index}>
            {text}
          </p>
        ))}
      </div>
    </ResultSection>
  );
};
