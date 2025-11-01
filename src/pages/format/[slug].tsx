import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { returnComputedFormatText } from "@/lib/return-computed-format-text";
import { DevelopmentNav } from "@/components/DevelopmentNav";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { useRouter } from "next/router";
import { Nav } from "@/components/Nav";
import { NextPage } from "next";
import { Seo } from "@/components/Seo";

const Slug: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

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

export default Slug;
