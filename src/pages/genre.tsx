import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { BackLink } from '@/components/BackLink';
import { GENRE_LIST } from '@/lib/genre-list';
import { genreTags } from '@/lib/genre-tags';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';

export default function Genre() {
  return (
    <Container>
      <Seo seoTitle={seo.page.genre.title} seoDescription={seo.page.genre.description} path="/genre" />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <PageHeader
          eyebrow="Reference"
          title={seo.page.genre.heading}
          description="All supported genres. Picking one adds a few genre tags to the generated set."
        />
        <div className="grid gap-4 mt-8 grid-cols-2 mb-auto">
          {GENRE_LIST.map((genre) => {
            const tags = genreTags(genre.slug);

            return (
              <section className="surface p-5" key={genre.slug}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-semibold text-black dark:text-white">{genre.name}</h2>
                  <span className="text-base tabular-nums text-gray-500 dark:text-gray-400">
                    {tags.length ? `+${tags.length} tags` : 'No extra tags'}
                  </span>
                </div>
                {tags.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        className="rounded-md bg-gray-100 px-2 py-0.5 text-base text-gray-700 dark:bg-neutral-800 dark:text-gray-300"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Only the format&apos;s own tags are generated.</p>
                )}
              </section>
            );
          })}
        </div>
        <div className="mt-12">
          <BackLink href="/" text="Go back home" />
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
