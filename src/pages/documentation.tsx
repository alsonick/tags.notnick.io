import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { DevelopmentNav } from "@/components/DevelopmentNav";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import { seo } from "@/lib/seo/seo";

export default function Documentation() {
  return (
    <Container>
      <Seo seoTitle={seo.page.documentation.title} seoDescription={seo.page.documentation.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <h1 className="text-4xl font-black tracking-tight mt-8">{seo.page.documentation.heading}</h1>
        <p className="mt-4 text-gray-800">Our official documentation.</p>
        <div className="flex flex-col mb-auto"></div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
