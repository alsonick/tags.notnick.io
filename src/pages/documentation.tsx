import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { DocumentationSection } from "@/components/documentation/DocumentationSection";
import { WhatToProvide } from "@/components/documentation/sections/WhatToProvide";
import { Endpoints } from "@/components/documentation/sections/Endpoints";
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
        <div className="flex flex-col mb-auto">
          <DocumentationSection heading="Endpoints">
            <p className="mb-4 text-gray-800">Here are the available endpoints that we provide:</p>
            <Endpoints />
          </DocumentationSection>
          <DocumentationSection heading="What To Provide">
            <p className="mb-4 text-gray-800">
              If you plan to consume our public Application Programming Interface (API) then here are some of the
              available parameters that you can provide when making requests to our <b>`/v1/generate`</b> endpoint.
            </p>
            <WhatToProvide />
          </DocumentationSection>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
