'use client';

import { ENDPOINTS } from '@/lib/documentation/endpoints';
import { Endpoint } from '@/types/documentation/endpoint';
import { MethodBadge } from '../ui/MethodBadge';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { CodeBlock } from '../ui/CodeBlock';
import { useState } from 'react';

interface EndpointExample {
  description: string;
  request: { label: string; code: string }[];
  response: string;
}

const EXAMPLES: Record<string, EndpointExample> = {
  'https://tags.notnick.io/api/v1/generate': {
    description: 'Generate optimized YouTube tags, title suggestions, hashtags, and SEO metadata for a song.',
    request: [
      {
        label: 'cURL',
        code: `curl "https://tags.notnick.io/api/v1/generate?\\
artist=Rex%20Orange%20County%20-%20Pluto%20Projector&format=lyrics"`,
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
  "artist": "Rex Orange County",
  "title": "Pluto Projector",
  "tags": "rex orange county pluto projector lyrics,pluto projector lyrics,lyrics pluto projector,rex orange county pluto projector",
  "length": 117,
  "hashtags": ["#rexorangecounty", "#plutoprojector", "#lyrics"],
  "responseId": "f3a9c1e2"
}`,
  },
  'https://tags.notnick.io/api/v1/length': {
    description: 'Calculate the total character length of a comma-separated tag string.',
    request: [
      {
        label: 'cURL',
        code: `curl "https://tags.notnick.io/api/v1/length?\\
tags=pluto%20projector%20lyrics,lyrics%20pluto%20projector"`,
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
  "length": 41
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
          <div key={endpoint.endpoint} className="overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <MethodBadge method={endpoint.method} />
                <code className="font-mono text-sm font-semibold text-gray-900">{path}</code>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(endpoint.endpoint, index)}
                className="flex shrink-0 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:text-gray-900"
                title="Copy endpoint URL"
              >
                {copiedIndex === index ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                {copiedIndex === index ? 'Copied' : 'Copy URL'}
              </button>
            </div>
            <div className="flex flex-col gap-4 p-4">
              {example ? (
                <>
                  <p className="text-gray-700">{example.description}</p>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Example request</p>
                    <CodeBlock tabs={example.request} />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Example response
                    </p>
                    <CodeBlock language="json" code={example.response} />
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
