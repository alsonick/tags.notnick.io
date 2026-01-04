import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { ADDITIONAL_FORMAT_LIST } from '@/lib/additional-format-list';
import { DevelopmentNav } from '@/components/DevelopmentNav';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { FORMAT_LIST } from '@/lib/format-list';
import { TagText } from '@/components/TagText';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';
import Link from 'next/link';
import { ADDITIONAL_FORMATS } from '@/lib/additional-formats';

export default function Format() {
  return (
    <Container>
      <Seo seoTitle={seo.page.format.title} seoDescription={seo.page.format.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <h1 className="text-4xl font-black tracking-tight mt-8">{seo.page.format.heading}</h1>
        <p className="mt-4 text-gray-800">Our format string templates for all the supported formats.</p>
        <div className="grid items-center gap-4 mt-8 grid-cols-2">
          {FORMAT_LIST.filter((format) => !ADDITIONAL_FORMATS.includes(format.slug)).map((format) => (
            <Link
              href={`/format/${format.slug}`}
              className="flex items-center border p-2 px-4 rounded-lg
                            hover:cursor-pointer w-full duration-300 hover:shadow-lg"
              key={format.slug}
            >
              <TagText text={format.name} />
            </Link>
          ))}
        </div>
        <h2 className="text-2xl font-black mt-16 mb-4">Additional Format Templates</h2>
        <div className="grid items-center gap-4 grid-cols-2 mb-auto">
          {ADDITIONAL_FORMAT_LIST.map((format) => (
            <Link
              href={`/format/${format.slug}`}
              className="flex items-center border p-2 px-4 rounded-lg
                            hover:cursor-pointer w-full duration-300 hover:shadow-lg"
              key={format.slug}
            >
              <TagText text={format.name} />
            </Link>
          ))}
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
