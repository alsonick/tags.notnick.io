'use client';

import { ENDPOINTS } from '@/lib/documentation/endpoints';
import { Endpoint } from '@/types/documentation/endpoint';
import { MethodBadge } from '../ui/MethodBadge';
import { FiArrowDown, FiCopy, FiCheck } from 'react-icons/fi';
import { CodeBlock } from '../ui/CodeBlock';
import { Button } from '@/components/Button';
import { useState } from 'react';

interface EndpointExample {
  description: string;
  // Anchor of the parameters section for this endpoint.
  paramsAnchor: string;
  request: { label: string; code: string }[];
  response: string;
}

const EXAMPLES: Record<string, EndpointExample> = {
  'https://tags.notnick.io/api/v1/generate': {
    description: 'Generate optimized YouTube tags, title suggestions, hashtags, and SEO metadata for a song.',
    paramsAnchor: '#generate-parameters',
    request: [
      {
        label: 'cURL',
        code: `curl "https://tags.notnick.io/api/v1/generate?\\
artist=Rex%20Orange%20County%20-%20Pluto%20Projector&format=lyrics&source=curl"`,
      },
      {
        label: 'JavaScript',
        code: `const params = new URLSearchParams({
  artist: "Rex Orange County - Pluto Projector",
  format: "lyrics",
});

const res = await fetch(
  \`https://tags.notnick.io/api/v1/generate?\${params}\`
);

const data = await res.json();`,
      },
    ],
    response: `{
  "success": true,
  "tags": "rex orange county pluto projector,rex orange county pluto projector lyrics,pluto projector lyrics,pluto projector rex orange county lyrics,lyrics pluto projector,rex orange county lyrics pluto projector,pluto projector,rex orange county,pluto projector rex orange county,lyrics",
  "tagsToBeRemoved": "",
  "removedTags": "rex orange county pluto projector,rex orange county pluto projector lyrics,pluto projector lyrics,pluto projector rex orange county lyrics,lyrics pluto projector,rex orange county lyrics pluto projector,pluto projector,rex orange county,pluto projector rex orange county,lyrics",
  "removedTagsLength": 295,
  "title": "Pluto Projector",
  "genre": "None",
  "artist": "Rex Orange County",
  "artistCustomFormat": 0,
  "customFormat": "",
  "features": [],
  "hashtags": ["RexOrangeCounty", "PlutoProjector", "Lyrics"],
  "tiktok": "none",
  "channel": "none",
  "log": "true",
  "extras": {
    "titles": "Rex Orange County - Pluto Projector (Lyrics)=Rex Orange County - Pluto Projector [Lyrics]=Rex Orange County - Pluto Projector",
    "seo": {
      "text": "Rex Orange County=Pluto Projector=Rex Orange County Pluto Projector Lyrics=Pluto Projector Lyrics=Pluto Projector Rex Orange County=Rex Orange County Pluto Projector"
    },
    "array": {
      "removedTags": [...],
      "titles": [...],
      "tags": [...]
    }
  },
  "url": "/api/v1/generate?title=Pluto%20Projector&artist=Rex%20Orange%20County&features=none&tiktok=false&format=lyrics&channel=none&shuffle=false&genre=none&verse=none&custom=false&log=true&response=415c9517-81cd-4164-a3bd-6c1dafeeb147&example=false&source=unknown",
  "responseId": "415c9517-81cd-4164-a3bd-6c1dafeeb147",
  "length": 295
}`,
  },
  'https://tags.notnick.io/api/v1/length': {
    description: 'Calculate the total character length of a comma-separated tag string.',
    paramsAnchor: '#length-parameters',
    request: [
      {
        label: 'cURL',
        code: `curl "https://tags.notnick.io/api/v1/length?\\
tags=pluto%20projector%20lyrics,lyrics%20pluto%20projector&source=curl"`,
      },
      {
        label: 'JavaScript',
        code: `const params = new URLSearchParams({
  tags: "pluto projector lyrics,lyrics pluto projector",
});

const res = await fetch(
  \`https://tags.notnick.io/api/v1/length?\${params}\`
);

const data = await res.json();`,
      },
    ],
    response: `{
  "success": true,
  "length": 49
}`,
  },
};

export const Endpoints = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (endpoint: string, index: number) => {
    navigator.clipboard.writeText(endpoint);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {ENDPOINTS.map((endpoint: Endpoint, index: number) => {
        const example = EXAMPLES[endpoint.endpoint];
        const path = endpoint.endpoint.replace('https://tags.notnick.io', '');

        return (
          <div
            key={endpoint.endpoint}
            className="surface overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/70 dark:border-neutral-800 dark:bg-neutral-900/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <MethodBadge method={endpoint.method} />
                <code className="font-mono text-base font-semibold text-gray-900 dark:text-gray-100">{path}</code>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleCopy(endpoint.endpoint, index)}
                className="shrink-0"
                title="Copy endpoint URL"
              >
                {copiedIndex === index ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                {copiedIndex === index ? 'Copied' : 'Copy URL'}
              </Button>
            </div>
            <div className="flex flex-col gap-4 p-4">
              {example ? (
                <>
                  <div className="flex items-start justify-between gap-6">
                    <p className="text-gray-700 dark:text-gray-300">{example.description}</p>
                    <a
                      className="group flex shrink-0 items-center gap-1 text-base font-medium text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                      href={example.paramsAnchor}
                    >
                      Parameters
                      <FiArrowDown className="transition-transform group-hover:translate-y-0.5" />
                    </a>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Example request
                    </p>
                    <CodeBlock tabs={example.request} />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Example response
                    </p>
                    <CodeBlock language="json" code={example.response} maxHeight={420} />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};
