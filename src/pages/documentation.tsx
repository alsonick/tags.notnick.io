import { CustomStringTemplate } from '@/components/documentation/sections/CustomStringTemplate';
import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { DocumentationSection } from '@/components/documentation/DocumentationSection';
import { AdditionalTags } from '@/components/documentation/sections/AdditionalTags';
import { DocsSidebar, DocsSection } from '@/components/documentation/DocsSidebar';
import { DiscordBot } from '@/components/documentation/sections/DiscordBot';
import { FormatTemplates } from '@/components/documentation/sections/FormatTemplates';
import { Endpoints } from '@/components/documentation/sections/Endpoints';
import { WhatToProvide } from '@/components/documentation/sections/WhatToProvide';
import { FiArrowRight, FiCode, FiEdit3, FiMail, FiServer, FiSliders, FiUnlock } from 'react-icons/fi';
import { CodeBlock } from '@/components/documentation/ui/CodeBlock';
import { buttonVariants } from '@/components/Button';
import { FaDiscord } from 'react-icons/fa6';
import { Container } from '@/components/Container';
import { Badge } from '@/components/shadcn/badge';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';
import Link from 'next/link';

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction', group: 'Get started' },
  { id: 'endpoints', label: 'Endpoints', group: 'Get started' },
  { id: 'generate-parameters', label: 'Generate Parameters', group: 'API reference' },
  { id: 'length-parameters', label: 'Length Parameters', group: 'API reference' },
  { id: 'custom-string-template', label: 'Custom String Template', group: 'Guides' },
  { id: 'additional-tags', label: 'Additional Tags', group: 'Guides' },
  { id: 'discord-bot', label: 'Discord Bot', group: 'Guides' },
  { id: 'format-templates', label: 'Format Templates', group: 'Guides' },
  { id: 'further-assistance', label: 'Further Assistance', group: 'Help' },
];

// Shortcuts shown in the introduction, reusing each section's own description.
const EXPLORE_CARDS = [
  {
    icon: FiServer,
    href: '#endpoints',
    title: 'Endpoints',
    description: 'The available endpoints, with example requests and responses.',
  },
  {
    icon: FiSliders,
    href: '#generate-parameters',
    title: 'Parameters',
    description: 'Parameters accepted by the /v1/generate and the /v1/length endpoints.',
  },
  {
    icon: FiEdit3,
    href: '#custom-string-template',
    title: 'Custom String Template',
    description: 'Define your own template to control exactly how generated tags are structured.',
  },
  {
    icon: FaDiscord,
    href: '#discord-bot',
    title: 'Discord Bot',
    description: 'Generate tags directly from your Discord server with our official Discord bot.',
  },
];

const QUICK_START = `curl "https://tags.notnick.io/api/v1/generate?\\
artist=Rex%20Orange%20County%20-%20Pluto%20Projector"`;

const INFO_CARDS = [
  { icon: FiServer, label: 'Base URL', value: 'tags.notnick.io' },
  { icon: FiUnlock, label: 'Authentication', value: 'None' },
  { icon: FiCode, label: 'Response', value: 'JSON' },
];

export default function Documentation() {
  return (
    <Container>
      <Seo
        seoTitle={seo.page.documentation.title}
        seoDescription={seo.page.documentation.description}
        path="/documentation"
      />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <main className="hidden h-full w-[72rem] flex-col px-2 pt-32 xl:flex">
        <div className="mb-auto flex items-start gap-12">
          <DocsSidebar sections={SECTIONS} />
          <div className="min-w-0 flex-1">
            <header className="border-b border-gray-100 dark:border-neutral-800 pb-8">
              <Badge className="border-brand-100 bg-brand-50 text-brand-700 dark:border-brand-900 dark:bg-brand-950 dark:text-brand-400">
                API Reference
              </Badge>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                {seo.page.documentation.heading}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
                A free, public API that generates SEO-optimized YouTube metadata for your lyric videos, including tags,
                titles, hashtags, and keywords.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {INFO_CARDS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="surface p-4">
                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                      <Icon className="text-base" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
                    </div>
                    <p className="mt-1.5 font-mono text-base font-medium text-gray-900 dark:text-gray-100">{value}</p>
                  </div>
                ))}
              </div>
            </header>

            <DocumentationSection
              heading="Introduction"
              description="Everything you need to start generating metadata programmatically."
            >
              <p className="text-gray-700 dark:text-gray-300">
                The Lyrics Tags Generator API is completely free and requires no API key. Send a{' '}
                <Badge variant={'secondary'}>GET</Badge> request to one of the endpoints below and you'll receive a JSON
                response. All parameters are passed as query string values.
              </p>
              <p className="mt-8 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Quick start
              </p>
              <CodeBlock tabs={[{ label: 'cURL', code: QUICK_START }]} />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {EXPLORE_CARDS.map(({ icon: Icon, href, title, description }) => (
                  <a
                    className="surface group flex gap-4 p-4 transition-all hover:border-gray-300 hover:shadow-md dark:hover:border-neutral-700"
                    href={href}
                    key={title}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
                      <Icon className="text-base" />
                    </div>
                    <div>
                      <p className="flex items-center gap-1 font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                        <FiArrowRight className="text-sm text-gray-400 transition-transform group-hover:translate-x-0.5" />
                      </p>
                      <p className="mt-0.5 text-base text-gray-600 dark:text-gray-400">{description}</p>
                    </div>
                  </a>
                ))}
              </div>
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

            <DocumentationSection heading="Discord Bot" description="Generate tags directly from your Discord server.">
              <DiscordBot />
            </DocumentationSection>

            <DocumentationSection
              heading="Format Templates"
              description="The format string templates we use for every supported and additional format."
            >
              <FormatTemplates />
            </DocumentationSection>

            <DocumentationSection heading="Further Assistance" border={false}>
              <div className="surface flex items-center justify-between gap-6 bg-gray-50/70 p-6 dark:bg-neutral-900/50">
                <p className="text-gray-700 dark:text-gray-300">
                  If you have any questions or need further assistance, feel free to reach out to me at{' '}
                  <Link href="mailto:hi@notnick.io" className="link">
                    hi@notnick.io
                  </Link>
                  , responses are usually within 24 hours.
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <Link className={buttonVariants({ variant: 'secondary' })} href="/faq">
                    Read the FAQ
                  </Link>
                  <Link className={buttonVariants()} href="mailto:hi@notnick.io">
                    Email me <FiMail />
                  </Link>
                </div>
              </div>
            </DocumentationSection>
          </div>
        </div>
        <Footer />
      </main>
    </Container>
  );
}
