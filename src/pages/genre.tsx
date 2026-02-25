import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { DevelopmentNav } from '@/components/DevelopmentNav';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { TagText } from '@/components/TagText';
import { GENRE_LIST } from '@/lib/genre-list';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';

export default function Genre() {
  return (
    <Container>
      <Seo seoTitle={seo.page.genre.title} seoDescription={seo.page.genre.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <h1 className="text-4xl font-black tracking-tight mt-8">{seo.page.genre.heading}</h1>
        <p className="mt-4 text-gray-800">All supported genres.</p>
        <div className="grid items-center gap-4 mt-8 grid-cols-2 mb-auto">
          {GENRE_LIST.map((genre) => (
            <div className="flex items-center border p-2 px-4 rounded-lg w-full duration-300" key={genre.slug}>
              <TagText text={genre.name} />
            </div>
          ))}
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
