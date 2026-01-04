import { CustomStringTemplate } from '@/components/documentation/sections/CustomStringTemplate';
import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { DocumentationSection } from '@/components/documentation/DocumentationSection';
import { AdditionalTags } from '@/components/documentation/sections/AdditionalTags';
import { WhatToProvide } from '@/components/documentation/sections/WhatToProvide';
import { Endpoints } from '@/components/documentation/sections/Endpoints';
import { DevelopmentNav } from '@/components/DevelopmentNav';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { Badge } from '@/components/shadcn/badge';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';
import Link from 'next/link';

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
              available parameters that you can provide when making requests to our{' '}
              <Badge variant={'secondary'}>/v1/generate</Badge> endpoint.
            </p>
            <WhatToProvide endpoint="generate" />
            <p className="my-4 text-gray-800">
              For the <Badge variant={'secondary'}>/v1/length</Badge> endpoint, here's what you need to provide:
            </p>
            <WhatToProvide endpoint="length" />
          </DocumentationSection>
          <DocumentationSection heading="Custom String Template">
            <p className="mb-4 text-gray-800">
              We also allow you to define your own custom string template for generated tags. Here's what a string
              template typically looks like this:
            </p>
            <CustomStringTemplate />
          </DocumentationSection>
          <DocumentationSection heading="Additional Tags">
            <p className="mb-4 text-gray-800">
              We also provide the functionality that will allow you to generate additional tags based on seasonal
              events. The only seasonal events we support are <Badge variant={'secondary'}>Halloween</Badge> and{' '}
              <Badge variant={'secondary'}>Christmas</Badge>. This is how you generate additional tags:
            </p>
            <AdditionalTags />
          </DocumentationSection>
          <DocumentationSection heading="Further Assistance" border={false}>
            <p className="text-gray-800">
              If you have any questions or need further assistance, feel free to reach out to me at{' '}
              <Link href="mailto:hi@notnick.io" className="text-blue-500 font-semibold hover:underline">
                hi@notnick.io
              </Link>
            </p>
          </DocumentationSection>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
