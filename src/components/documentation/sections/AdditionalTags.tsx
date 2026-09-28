import { Badge } from '@/components/shadcn/badge';
import { Tag } from '@/components/Tag';
import Link from 'next/link';
import { DocumentationNote } from '../ui/DocumentationNote';

export const AdditionalTags = () => {
  const resulting = [
    'rex orange county pluto projector lyrics',
    'pluto projector lyrics',
    'lyrics pluto projector',
    'rex orange county pluto projector',
  ];

  const additionalChristmasTags = [
    'christmas songs',
    'christmas music',
    `christmas ${new Date().getFullYear()}`,
    'christmas playlist',
  ];

  return (
    <div className="mb-4">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Let's say you want to generate Christmas additional tags for the following song:
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        <Badge variant={'secondary'}>Rex Orange County - Pluto Projector</Badge>
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        You would need to append the <Badge variant={'secondary'}>\christmas</Badge> flag after the end of the song,
        here's how it would look:
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        <Badge variant={'secondary'}>Rex Orange County - Pluto Projector\christmas</Badge>
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Here's the resulting tags:</p>
      <div className="surface mb-4 p-4">
        <div className="flex flex-wrap gap-2">
          {resulting.map((tag) => (
            <Tag key={tag} tag={tag} deletable={false} />
          ))}
          {additionalChristmasTags.map((additionalChristmasTag) => (
            <Tag key={additionalChristmasTag} tag={additionalChristmasTag} deletable={false} highlighted />
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="h-2.5 w-2.5 rounded-sm border border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-500/10" />
          Added by the <code className="font-mono">\christmas</code> flag
        </p>
      </div>
      <Link className="link w-fit" href="/format" target="_blank">
        Click here to see the available additional tags format
      </Link>
      <div className="mt-6">
        <DocumentationNote>
          Propose new additional tags by{' '}
          <Link
            className="link"
            href="https://github.com/Lyrics-Tags-Generator/formats/issues/new"
            target="_blank"
          >
            creating an issue on GitHub
          </Link>{' '}
          with your suggestion.
        </DocumentationNote>
      </div>
    </div>
  );
};
