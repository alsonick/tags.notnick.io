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

  const resultingAdditionalChristmasTags = [
    ...resulting,
    'christmas songs',
    'christmas music',
    `christmas ${new Date().getFullYear()}`,
    'christmas playlist',
  ];

  return (
    <div className="mb-4">
      <p className="text-gray-800 mb-4">
        Let's say you want to generate Christmas additional tags for the following song:
      </p>
      <p className="text-gray-800 mb-4">
        <Badge variant={'secondary'}>Rex Orange County – Pluto Projector</Badge>
      </p>
      <p className="text-gray-800 mb-4">
        You would need to append the <Badge variant={'secondary'}>\christmas</Badge> flag after the end of the song,
        here's how it would look:
      </p>
      <p className="text-gray-800 mb-4">
        <Badge variant={'secondary'}>Rex Orange County – Pluto Projector\christmas</Badge>
      </p>
      <p className="text-gray-800 mb-4">Here's the resulting tags:</p>
      <div className="flex flex-wrap gap-4 mb-4">
        {resultingAdditionalChristmasTags.map((additionalChristmasTag) => (
          <Tag key={additionalChristmasTag} tag={additionalChristmasTag} deletable={false} />
        ))}
      </div>
      <Link className="text-blue-500 w-fit font-semibold hover:underline" href="/format" target="_blank">
        Click here to see the available additional tags format
      </Link>
      <div className="mt-6">
        <DocumentationNote>
          Propose new additional tags by{' '}
          <Link
            className="text-blue-500 font-semibold hover:underline"
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
