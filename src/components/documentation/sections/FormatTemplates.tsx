import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion';
import { TemplateStringFormatList } from '@/types/template-string-format-list';
import { TEMPLATE_STRING_FORMAT_LIST } from '@/lib/template-string-format-list';
import { ADDITIONAL_FORMATS } from '@/lib/additional-formats';
import { Badge } from '@/components/shadcn/badge';
import { FORMAT_LIST } from '@/lib/format-list';
import { CodeBlock } from '../ui/CodeBlock';
import Link from 'next/link';

const nameFor = (filter: string) => FORMAT_LIST.find((format) => format.slug === filter)?.name ?? filter;

const supportedFormats = TEMPLATE_STRING_FORMAT_LIST.filter((format) => !ADDITIONAL_FORMATS.includes(format.filter));
const additionalFormats = TEMPLATE_STRING_FORMAT_LIST.filter((format) => ADDITIONAL_FORMATS.includes(format.filter));

const FormatAccordion = ({ formats }: { formats: TemplateStringFormatList[] }) => (
  <div className="rounded-xl border border-gray-200 dark:border-neutral-800 px-4">
    <Accordion type="multiple">
      {formats.map((format) => (
        <AccordionItem key={format.filter} value={format.filter}>
          <AccordionTrigger className="text-base">{nameFor(format.filter)}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            {format.formats.map((entry) => (
              <div key={entry.constraint}>
                <p className="mb-1.5 font-mono text-xs text-gray-500 dark:text-gray-400">{entry.constraint}</p>
                <CodeBlock language="template" code={entry.template} />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export const FormatTemplates = () => {
  return (
    <div className="flex flex-col">
      <p className="text-gray-700 dark:text-gray-300">
        Every format is built from a <b>format string template</b>: a comma-separated list of tag patterns where
        variables are swapped out for the song's components. The available variables are{' '}
        <Badge variant={'secondary'}>{'{artist}'}</Badge>, <Badge variant={'secondary'}>{'{title}'}</Badge>,{' '}
        <Badge variant={'secondary'}>{'{firstFeature}'}</Badge>, <Badge variant={'secondary'}>{'{secondFeature}'}</Badge>
        , and <Badge variant={'secondary'}>{'{thirdFeature}'}</Badge>.
      </p>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Each format has several templates, chosen based on the constraint shown above it. The constraint reflects how
        many featured artists are present (<Badge variant={'secondary'}>feature-1</Badge>,{' '}
        <Badge variant={'secondary'}>feature-2</Badge>, <Badge variant={'secondary'}>feature-3</Badge>) and whether
        TikTok tags are enabled (<Badge variant={'secondary'}>@tiktok=true@</Badge>).
      </p>

      <h3 className="mb-4 mt-8 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">Supported Formats</h3>
      <FormatAccordion formats={supportedFormats} />

      <h3 className="mb-4 mt-8 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">Additional Format Templates</h3>
      <FormatAccordion formats={additionalFormats} />

      <Link className="mt-6 w-fit font-semibold text-brand-500 hover:underline" href="/format" target="_blank">
        View the full format reference
      </Link>
    </div>
  );
};
