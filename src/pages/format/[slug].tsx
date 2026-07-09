import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { TEMPLATE_STRING_FORMAT_LIST } from "@/lib/template-string-format-list";
import { returnComputedFormatText } from "@/lib/return-computed-format-text";
import { FORMAT_LIST } from "@/lib/format-list";
import { DevelopmentNav } from "@/components/DevelopmentNav";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { FiArrowLeft } from "react-icons/fi";
import { Footer } from "@/components/Footer";
import { GetServerSideProps } from "next";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import { NextPage } from "next";
import Link from "next/link";

const Slug: NextPage<{ slug: string }> = ({ slug }) => {
  const computedFormatTextLyricsTemplateTitle = returnComputedFormatText(slug);
  const templates = TEMPLATE_STRING_FORMAT_LIST.find((f) => f.filter == slug);

  return (
    <Container>
      <Seo
        seoTitle={`${computedFormatTextLyricsTemplateTitle} Format | Lyrics Tags Generator`}
        seoDescription={`YouTube tag format string templates for ${computedFormatTextLyricsTemplateTitle} videos. See the exact templates Lyrics Tags Generator uses to build tags for this format.`}
        path={`/format/${slug}`}
      />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <h1 className="text-4xl font-black tracking-tight mt-8">
          {computedFormatTextLyricsTemplateTitle.length ? computedFormatTextLyricsTemplateTitle : "None"}
        </h1>
        <div className="flex flex-col mt-8 mb-auto">
          {templates
            ? templates.formats.map((format) => (
                <div className="mb-8">
                  <h1 className="text-2xl mb-4 tracking-tight">{format.constraint}</h1>
                  <div className="bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg">
                    <p className="text-xl whitespace-nowrap overflow-x-auto text-gray-800 dark:text-gray-300"> {format.template}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="mt-16 flex items-center justify-between">
          <Link
            className="text-brand-500 font-semibold hover:underline flex items-center"
            title="Go back"
            href="/format"
          >
            <FiArrowLeft className="mr-1 text-lg" />
            Go back
          </Link>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  if (!FORMAT_LIST.some((format) => format.slug === slug)) return { notFound: true };
  return { props: { slug } };
};

export default Slug;
