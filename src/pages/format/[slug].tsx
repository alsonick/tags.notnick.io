import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { returnComputedFormatText } from "@/lib/return-computed-format-text";
import { DevelopmentNav } from "@/components/DevelopmentNav";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { GetServerSideProps } from "next";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import { NextPage } from "next";

const Slug: NextPage<{ slug: string }> = ({ slug }) => {
  const format = returnComputedFormatText(slug);

  return (
    <Container>
      <Seo seoTitle={`${format} Format | Lyrics Tags Generator`} seoDescription="" />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <h1 className="text-4xl font-black tracking-tight mt-8">{format.length ? format : "None"}</h1>
      </MainWrapper>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  return { props: { slug } };
};

export default Slug;
