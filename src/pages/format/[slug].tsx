import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { TEMPLATE_STRING_FORMAT_LIST } from "@/lib/template-string-format-list";
import { returnComputedFormatText } from "@/lib/return-computed-format-text";
import { DevelopmentNav } from "@/components/DevelopmentNav";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { GetServerSideProps } from "next";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import { NextPage } from "next";

const Slug: NextPage<{ slug: string }> = ({ slug }) => {
  const computedFormatTextLyricsTemplateTitle = returnComputedFormatText(slug);
  const templates = TEMPLATE_STRING_FORMAT_LIST.find((f) => f.filter == slug);

  return (
    <Container>
      <Seo seoTitle={`${computedFormatTextLyricsTemplateTitle} Format | Lyrics Tags Generator`} seoDescription="" />
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
                  <h1 className="text-3xl mb-4 tracking-tight font-light">{format.constraint}</h1>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-xl whitespace-nowrap overflow-x-auto text-gray-800"> {format.template}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  return { props: { slug } };
};

export default Slug;
