import { ChangelogEntry, getChangelogEntries } from '@/lib/changelogs';
import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { ChangelogMarkdown } from '@/components/changelog/ChangelogMarkdown';
import { formatChangelogDate } from '@/lib/format-changelog-date';
import { GITHUB_REPOSITORY_URL } from '@/lib/constants';
import { DevelopmentNav } from '@/components/DevelopmentNav';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { FiArrowLeft } from 'react-icons/fi';
import { GetStaticProps } from 'next';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';
import Link from 'next/link';

export default function Changelog({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <Container>
      <Seo seoTitle={seo.page.changelog.title} seoDescription={seo.page.changelog.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <h1 className="text-4xl font-black tracking-tight mt-8">{seo.page.changelog.heading}</h1>
        <div className="mt-12 flex flex-col gap-16 mb-auto">
          {entries.length === 0 && (
            <p className="text-lg text-gray-800 dark:text-gray-300">No changelog entries yet — check back soon!</p>
          )}
          {entries.map((entry) => (
            <section key={entry.slug}>
              {entry.commit && (
                <Link
                  className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-gray-200 font-mono text-sm px-2.5 py-0.5 rounded-md transition-colors mb-2"
                  href={`${GITHUB_REPOSITORY_URL}/commit/${entry.commit}`}
                  title={`View commit ${entry.commit} on GitHub`}
                  target="_blank"
                >
                  {entry.commit}
                </Link>
              )}
              <h2 className="text-3xl tracking-tight">
                <Link
                  className="font-semibold hover:underline"
                  href={`/changelog/${entry.slug}`}
                  title={entry.title}
                >
                  {entry.title}
                </Link>
                {entry.date && <span className="text-gray-500 dark:text-gray-400"> ({formatChangelogDate(entry.date)})</span>}
              </h2>
              <div className="border-l-2 border-blue-600 pl-8 ml-1 mt-6 text-gray-800 dark:text-gray-300">
                <ChangelogMarkdown content={entry.content} />
              </div>
            </section>
          ))}
        </div>
        <div className="mt-16 flex items-center justify-between">
          <Link
            className="text-blue-500 font-semibold hover:underline flex items-center"
            title="Go back home"
            href="/"
          >
            <FiArrowLeft className="mr-1 text-lg" />
            Go back home
          </Link>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      entries: getChangelogEntries(),
    },
  };
};
