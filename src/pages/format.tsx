import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { TEMPLATE_STRING_FORMAT_LIST } from '@/lib/template-string-format-list';
import { ADDITIONAL_FORMAT_LIST } from '@/lib/additional-format-list';
import { ADDITIONAL_FORMATS } from '@/lib/additional-formats';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { FormatList } from '@/types/format-list';
import { FORMAT_LIST } from '@/lib/format-list';
import { FiArrowRight } from 'react-icons/fi';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';
import Link from 'next/link';

const FormatCard = ({ format }: { format: FormatList }) => {
  const templates = TEMPLATE_STRING_FORMAT_LIST.find((f) => f.filter === format.slug)?.formats ?? [];

  return (
    <Link
      href={`/format/${format.slug}`}
      className="surface group flex flex-col p-5 transition-all duration-150 hover:border-gray-300 hover:shadow-md dark:hover:border-neutral-700"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-black dark:text-white">{format.name}</h2>
        <FiArrowRight className="text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white" />
      </div>
      <p className="mt-0.5 text-base text-gray-500 dark:text-gray-400">
        {templates.length} {templates.length === 1 ? 'template' : 'templates'}
      </p>
    </Link>
  );
};

export default function Format() {
  return (
    <Container>
      <Seo seoTitle={seo.page.format.title} seoDescription={seo.page.format.description} path="/format" />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <PageHeader
          eyebrow="Reference"
          title={seo.page.format.heading}
          description="Our format string templates for all the supported formats."
        />
        <div className="grid gap-4 mt-8 grid-cols-2">
          {FORMAT_LIST.filter((format) => !ADDITIONAL_FORMATS.includes(format.slug)).map((format) => (
            <FormatCard format={format} key={format.slug} />
          ))}
        </div>
        <h2 className="text-xl font-bold tracking-tight mt-14">Additional Format Templates</h2>
        <p className="mt-1 mb-5 text-gray-600 dark:text-gray-400">
          Seasonal tags added on top of any format when you append a flag like{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base dark:bg-neutral-800">\christmas</code>{' '}
          after the song.
        </p>
        <div className="grid gap-4 grid-cols-2 mb-auto">
          {ADDITIONAL_FORMAT_LIST.map((format) => (
            <FormatCard format={format} key={format.slug} />
          ))}
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
