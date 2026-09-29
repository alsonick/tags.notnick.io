import { ChangelogEntry, getChangelogEntries } from '@/lib/changelogs';
import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { ChangelogMarkdown } from '@/components/changelog/ChangelogMarkdown';
import { formatChangelogDate } from '@/lib/format-changelog-date';
import { GITHUB_REPOSITORY_URL } from '@/lib/constants';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { BackLink } from '@/components/BackLink';
import { GetStaticProps } from 'next';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Changelog({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <Container>
      <Seo seoTitle={seo.page.changelog.title} seoDescription={seo.page.changelog.description} path="/changelog" />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <PageHeader
          eyebrow="What's new"
          title={seo.page.changelog.heading}
          description="New features, improvements and fixes to Lyrics Tags Generator."
        />
        <div className="mt-12 mb-auto">
          {entries.length === 0 && (
            <p className="text-lg text-gray-600 dark:text-gray-400">No changelog entries yet — check back soon!</p>
          )}
          {entries.map((entry, index) => (
            <section className="grid grid-cols-[9rem_1fr] gap-8" key={entry.slug}>
              <div className="sticky top-24 flex flex-col items-start gap-2 self-start pt-1.5">
                {entry.date && (
                  <time className="text-base font-medium text-gray-500 dark:text-gray-400">
                    {formatChangelogDate(entry.date)}
                  </time>
                )}
                <div className="flex items-center gap-1.5">
                  {entry.commit && (
                    <Link
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-gray-300 font-mono text-base px-2 py-0.5 rounded-md transition-colors"
                      href={`${GITHUB_REPOSITORY_URL}/commit/${entry.commit}`}
                      title={`View commit ${entry.commit} on GitHub`}
                      target="_blank"
                    >
                      {entry.commit}
                    </Link>
                  )}
                  {index === 0 && (
                    <span className="rounded-md bg-brand-100 px-2 py-0.5 text-base font-medium text-brand-800 dark:bg-brand-500/15 dark:text-brand-400">
                      Latest
                    </span>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  'relative border-l pl-8 text-gray-700 dark:text-gray-300',
                  index < entries.length - 1 ? 'pb-16' : 'pb-2'
                )}
              >
                <span
                  className={cn(
                    'absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full ring-4 ring-background',
                    index === 0 ? 'bg-brand-500' : 'bg-gray-300 dark:bg-neutral-600'
                  )}
                />
                <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                  <Link
                    className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
                    href={`/changelog/${entry.slug}`}
                    title={entry.title}
                  >
                    {entry.title}
                  </Link>
                </h2>
                {entry.contributors.length > 0 && (
                  <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                    By {entry.contributors.map((contributor) => contributor.name).join(', ')}
                  </p>
                )}
                <div className="mt-6">
                  <ChangelogMarkdown content={entry.content} />
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className="mt-16">
          <BackLink href="/" text="Go back home" />
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
