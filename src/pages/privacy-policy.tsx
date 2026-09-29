import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { PageHeader } from '@/components/PageHeader';
import { BackLink } from '@/components/BackLink';
import { FiDownload } from 'react-icons/fi';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { seo } from '@/lib/seo/seo';

// Next.js
import Link from 'next/link';

const downloadPolicy = () => {
  const link = document.createElement('a');
  link.href = `/legal/privacy-policy/${new Date().getFullYear()}/privacy-policy.pdf`;
  link.download = 'privacy-policy.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="text-xl font-bold tracking-tight">{title}</h2>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base dark:bg-neutral-800">{children}</code>
);

export default function PrivacyPolicy() {
  return (
    <Container>
      <Seo
        seoTitle={seo.page.privacyPolicy.title}
        seoDescription={seo.page.privacyPolicy.description}
        path="/privacy-policy"
      />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <PageHeader eyebrow="Legal" title={seo.page.privacyPolicy.heading}>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-base text-gray-500 dark:text-gray-400">
              <p>
                Effective Date: <span className="font-medium text-gray-800 dark:text-gray-200">11 May 2025</span>
              </p>
              <span className="text-gray-300 dark:text-neutral-700">•</span>
              <p>
                Last Updated: <span className="font-medium text-gray-800 dark:text-gray-200">28 Oct 2025</span>
              </p>
            </div>
            <Button title="Download" variant="secondary" onClick={downloadPolicy}>
              Download PDF <FiDownload />
            </Button>
          </div>
        </PageHeader>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed mt-8">
          Thank you for visiting{' '}
          <Link
            className="link"
            href="https://tags.notnick.io"
            title="tags.notnick.io"
          >
            tags.notnick.io
          </Link>{' '}
          (Lyrics Tags Generator) (<b>“we”</b>, <b>“our”</b>, or <b>“us”</b>). Your privacy matters to us. This Privacy
          Policy outlines what data we collect (if any), how it’s used, and your rights.
        </div>
        <section className="mt-10">
          <SectionHeading title="What We Collect" />
          <div className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              We do not collect, store, or process any <i>personal information</i>.
            </p>
            <p>
              We do however log generated metadata, If you do not wish to have your generated metadata logged then set
              the <Code>log</Code> query to <Code>false</Code>. If you'd like access to logged data then please{' '}
              <Link
                className="link"
                href="mailto:hi@notnick.io"
                title="contact me"
              >
                contact me
              </Link>{' '}
              for more information.
            </p>
          </div>
        </section>
        <section className="mt-10">
          <SectionHeading title="Analytics and Cookies" />
          <div className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="mb-4">We may collect anonymous usage data.</p>
            <p className="mb-1">This may include:</p>
            <ul className="list-disc ml-5 marker:text-gray-400">
              <li>Referring URL</li>
              <li>Browser type</li>
              <li>Page views</li>
              <li>Saved settings</li>
            </ul>
          </div>
        </section>
        <section className="mt-10">
          <SectionHeading title="Changes To This Policy" />
          <div className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            <p>
              This Privacy Policy may be updated or revised from time to time to reflect changes in our practices,
              technology, legal requirements, or for other operational reasons. When we make changes, we will update the{" "}
              <b>“Effective Date”</b> at the top of this page to indicate when those changes take effect. We encourage
              you to review this Privacy Policy periodically to stay informed about how we are protecting your
              information and improving our services.
            </p>
          </div>
        </section>
        <section className="mt-10 mb-auto">
          <SectionHeading title="Contact" />
          <div className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="mb-4">For any questions about this Privacy Policy, feel free to reach out:</p>
            <p>
              Contact:{' '}
              <Link
                className="link"
                href="mailto:hi@notnick.io"
                title="hi@notnick.io"
                target="_blank"
              >
                hi@notnick.io
              </Link>
            </p>
          </div>
        </section>
        <div className="mt-16">
          <BackLink href="/" text="Go back home" />
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
