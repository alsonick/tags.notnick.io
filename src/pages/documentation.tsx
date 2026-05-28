import { CustomStringTemplate } from '@/components/documentation/sections/CustomStringTemplate';
import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { DocumentationSection } from '@/components/documentation/DocumentationSection';
import { AdditionalTags } from '@/components/documentation/sections/AdditionalTags';
import { DocsSidebar, DocsSection } from '@/components/documentation/DocsSidebar';
import { Endpoints } from '@/components/documentation/sections/Endpoints';
import { WhatToProvide } from '@/components/documentation/sections/WhatToProvide';
import { FiServer, FiUnlock, FiCode } from 'react-icons/fi';
import { DevelopmentNav } from '@/components/DevelopmentNav';
import { Container } from '@/components/Container';
import { Badge } from '@/components/shadcn/badge';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';
import Link from 'next/link';

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'endpoints', label: 'Endpoints' },
  { id: 'generate-parameters', label: 'Generate Parameters' },
  { id: 'length-parameters', label: 'Length Parameters' },
  { id: 'custom-string-template', label: 'Custom String Template' },
  { id: 'additional-tags', label: 'Additional Tags' },
  { id: 'further-assistance', label: 'Further Assistance' },
];

const INFO_CARDS = [
  { icon: FiServer, label: 'Base URL', value: 'tags.notnick.io/api' },
  { icon: FiUnlock, label: 'Authentication', value: 'None required' },
  { icon: FiCode, label: 'Response', value: 'JSON' },
];

export default function Documentation() {
  return (
    <Container>
      <Seo seoTitle={seo.page.documentation.title} seoDescription={seo.page.documentation.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <main className="hidden h-full w-[72rem] flex-col px-2 pt-32 xl:flex">
        <div className="mb-auto flex items-start gap-12">
          <DocsSidebar sections={SECTIONS} />
          <div className="min-w-0 flex-1">
            <header className="border-b border-gray-100 pb-8">
              <Badge className="border-teal-100 bg-teal-50 text-teal-700">API Reference</Badge>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
                {seo.page.documentation.heading}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-gray-600">
                A free, public API for generating YouTube metadata — tags, titles, hashtags, and SEO keywords — for your
                lyric videos.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {INFO_CARDS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Icon className="text-base" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
                    </div>
                    <p className="mt-1.5 font-mono text-sm font-medium text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </header>

            <DocumentationSection
              heading="Introduction"
              description="Everything you need to start generating metadata programmatically."
            >
              <p className="text-gray-700">
                The Lyrics Tags Generator API is completely free and requires no API key. Send a{' '}
                <Badge variant={'secondary'}>GET</Badge> request to one of the endpoints below and you'll receive a JSON
                response. All parameters are passed as query string values.
              </p>
            </DocumentationSection>

            <DocumentationSection
              heading="Endpoints"
              description="The available endpoints, with example requests and responses."
            >
              <Endpoints />
            </DocumentationSection>

            <DocumentationSection
              heading="Generate Parameters"
              description="Parameters accepted by the /v1/generate endpoint."
            >
              <WhatToProvide endpoint="generate" />
            </DocumentationSection>

            <DocumentationSection
              heading="Length Parameters"
              description="Parameters accepted by the /v1/length endpoint."
            >
              <WhatToProvide endpoint="length" />
            </DocumentationSection>

            <DocumentationSection
              heading="Custom String Template"
              description="Define your own template to control exactly how generated tags are structured."
            >
              <CustomStringTemplate />
            </DocumentationSection>

            <DocumentationSection
              heading="Additional Tags"
              description="Append seasonal tags for events like Halloween and Christmas."
            >
              <AdditionalTags />
            </DocumentationSection>

            <DocumentationSection heading="Further Assistance" border={false}>
              <p className="text-gray-700">
                If you have any questions or need further assistance, feel free to reach out to me at{' '}
                <Link href="mailto:hi@notnick.io" className="font-semibold text-blue-500 hover:underline">
                  hi@notnick.io
                </Link>
                .
              </p>
            </DocumentationSection>
          </div>
        </div>
        <Footer />
      </main>
    </Container>
  );
}
