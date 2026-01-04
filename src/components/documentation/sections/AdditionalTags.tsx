import { Badge } from '@/components/shadcn/badge';
import { Tag } from '@/components/Tag';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

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

  const resultingAdditionalHalloweenTags = [
    ...resulting,
    'halloween songs',
    'halloween music',
    `halloween ${new Date().getFullYear()}`,
    'halloween playlist',
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
      <div className="flex flex-wrap gap-4 mb-4 mt-6">
        {resultingAdditionalChristmasTags.map((additionalChristmasTag) => (
          <Tag key={additionalChristmasTag} tag={additionalChristmasTag} deletable={false} />
        ))}
      </div>
      <p className="text-gray-800 mb-4">
        For halloween, just append the <Badge variant={'secondary'}>\halloween</Badge> flag after the end of the song,
        here's how it would look:
      </p>
      <p className="text-gray-800 mb-4">
        <Badge variant={'secondary'}>Rex Orange County – Pluto Projector\halloween</Badge>
      </p>
      <Link className="text-blue-500 w-fit font-semibold hover:underline" href="/format" target="_blank">
        Click here to see the available additional tags format
      </Link>
    </div>
  );
};
