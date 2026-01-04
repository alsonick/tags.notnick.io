'use client';

import { ENDPOINTS } from '@/lib/documentation/endpoints';
import { Endpoint } from '@/types/documentation/endpoint';
import { Badge } from '@/components/shadcn/badge';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

export const Endpoints = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (endpoint: string, index: number) => {
    navigator.clipboard.writeText(endpoint);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col">
      {ENDPOINTS.map((endpoint: Endpoint, index: number) => (
        <div key={endpoint.endpoint} className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between">
            <Badge variant={'secondary'}>{endpoint.endpoint.replace('https://', '')}</Badge>
          </div>
          <div className="hover:cursor-pointer" onClick={() => handleCopy(endpoint.endpoint, index)}>
            <Badge variant={'secondary'} className="flex items-center gap-2">
              {copiedIndex === index ? <FiCheck /> : <FiCopy />}
              {copiedIndex === index ? 'Copied' : 'Copy'}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
