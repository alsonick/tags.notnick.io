import { ChangelogEntry, getChangelogEntries, getChangelogEntry } from '@/lib/changelogs';
import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { ChangelogMarkdown } from '@/components/changelog/ChangelogMarkdown';
import { GITHUB_REPOSITORY_URL } from '@/lib/constants';
import { GetStaticPaths, GetStaticProps } from 'next';
import { formatChangelogDate } from '@/lib/format-changelog-date';
import { DevelopmentNav } from '@/components/DevelopmentNav';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { FiArrowLeft } from 'react-icons/fi';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import Link from 'next/link';

export default function ChangelogDetail({ entry }: { entry: ChangelogEntry }) {
  return (
    <Container>
      <Seo seoTitle={`${entry.title} | Lyrics Tags Generator`} seoDescription={entry.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <div className="flex items-center gap-3 mt-8">
          {entry.date && (
            <time className="text-sm font-medium text-gray-500 dark:text-gray-400">{formatChangelogDate(entry.date)}</time>
          )}
          {entry.date && entry.commit && <span className="text-gray-400 dark:text-gray-500">•</span>}
          {entry.commit && (
            <Link
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-gray-200 font-mono text-xs px-2 py-0.5 rounded-md transition-colors"
              href={`${GITHUB_REPOSITORY_URL}/commit/${entry.commit}`}
              title={`View commit ${entry.commit} on GitHub`}
              target="_blank"
            >
              {entry.commit}
            </Link>
          )}
        </div>
        <h1 className="text-4xl font-black tracking-tight mt-1">{entry.title}</h1>
        {entry.contributors.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Contributors:{' '}
            {entry.contributors.map((contributor, index) => (
              <span className="font-medium text-gray-800 dark:text-gray-300" key={contributor.name}>
                {index > 0 && ', '}
                {contributor.url ? (
                  <Link
                    className="text-brand-500 hover:underline"
                    href={contributor.url}
                    title={contributor.name}
                    target="_blank"
                  >
                    {contributor.name}
                  </Link>
                ) : (
                  contributor.name
                )}
              </span>
            ))}
          </p>
        )}
        <div className="mt-6 text-gray-800 dark:text-gray-300 mb-auto">
          <ChangelogMarkdown content={entry.content} />
          <div className="border rounded-xl p-6 mt-12">
            <h2 className="text-xl font-bold text-black dark:text-white">Want to be featured in a changelog?</h2>
            <p className="mt-2">
              Lyrics Tags Generator is open source, and contributions of any kind are welcome. Add a feature, fix a
              bug or tidy something up, and you'll get a mention here along with a link to your socials. Head over to{' '}
              <Link
                className="text-brand-500 font-semibold hover:underline"
                href={GITHUB_REPOSITORY_URL}
                title="Lyrics Tags Generator on GitHub"
                target="_blank"
              >
                Lyrics Tags Generator on GitHub
              </Link>{' '}
              to get started.
            </p>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between">
          <Link
            className="text-brand-500 font-semibold hover:underline flex items-center"
            title="Go back to the changelog"
            href="/changelog"
          >
            <FiArrowLeft className="mr-1 text-lg" />
            Go back to the changelog
          </Link>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getChangelogEntries().map((entry) => ({ params: { slug: entry.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const entry = getChangelogEntry(context.params!.slug as string);
  if (!entry) return { notFound: true };
  return { props: { entry } };
};
