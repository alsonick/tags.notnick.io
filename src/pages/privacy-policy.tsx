import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { DevelopmentNav } from "@/components/DevelopmentNav";
import { FiDownload, FiArrowLeft } from "react-icons/fi";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import { seo } from "@/lib/seo/seo";

// Next.js
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <Container>
      <Seo seoTitle={seo.page.privacyPolicy.title} seoDescription={seo.page.privacyPolicy.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <h1 className="text-4xl font-black tracking-tight mt-8">Privacy Policy</h1>
        <div className="mt-8 text-gray-800">
          <p className="text-lg">Effective Date: 11 May 2025</p>
          <p className="text-lg">Last Updated: 27 Jun 2025</p>
        </div>
        <div className="text-gray-800 mt-8">
          Thank you for visiting{" "}
          <Link
            className="text-blue-500 font-semibold hover:underline"
            href="https://tags.notnick.io"
            title="tags.notnick.io"
          >
            tags.notnick.io
          </Link>{" "}
          (<b>“we”</b>, <b>“our”</b>, or <b>“us”</b>). Your privacy matters to us. This Privacy Policy outlines what
          data we collect (if any), how it’s used, and your rights.
        </div>
        <section className="my-8">
          <h1 className="text-2xl font-black">What We Collect</h1>
          <div className="mt-4 text-gray-800 ">
            <p className="mb-4">
              We do not collect, store, or process any <i>personal information</i>.
            </p>
            <p className="mb-1">What we do collect:</p>
            <ul className="list-disc ml-8">
              <li>
                <b>Generated tags data</b>; All generated tags data are <i>logged</i> but not stored in a database, we
                do this to monitor discrepancies with generated tags, such as if the tags overflow the{" "}
                <b>500 character limit</b> imposed by <b>YouTube</b>, then we can make the necessary changes so this
                doesn't happen again.
              </li>
            </ul>
            <p className="mt-8">
              If you'd like access to logged data then please{" "}
              <Link
                className="text-blue-500 font-semibold hover:underline"
                href="mailto:hi@notnick.io"
                title="contact me"
              >
                contact me
              </Link>{" "}
              for more information.
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h1 className="text-2xl font-black">Analytics and Cookies</h1>
          <div className="mt-4 text-gray-800">
            <p className="mb-4">We may collect anonymous usage data.</p>
            <p className="mb-1">This may include:</p>
            <ul className="list-disc ml-8">
              <li>Referring URL</li>
              <li>Browser type</li>
              <li>Page views</li>
              <li>Saved settings</li>
            </ul>
          </div>
        </section>
        <section className="mb-8">
          <h1 className="text-2xl font-black">Changes To This Policy</h1>
          <div className="mt-4 text-gray-800">
            <p>
              This Privacy Policy may be updated or revised from time to time to reflect changes in our practices,
              technology, legal requirements, or for other operational reasons. When we make changes, we will update the
              <b>“Effective Date”</b> at the top of this page to indicate when those changes take effect. We encourage
              you to review this Privacy Policy periodically to stay informed about how we are protecting your
              information and improving our services.
            </p>
          </div>
        </section>
        <section className="mb-auto">
          <h1 className="text-2xl font-black">Contact</h1>
          <div className="mt-4 text-gray-800">
            <p className="mb-4">For any questions about this policy, feel free to reach out:</p>
            <p>
              Twitter:{" "}
              <Link
                className="text-blue-500 font-semibold hover:underline"
                href="https://x.com/heynickn"
                title="@heynickn on X"
                target="_blank"
              >
                @heynickn on X
              </Link>
            </p>
            <p>
              Email:{" "}
              <Link
                className="text-blue-500 font-semibold hover:underline"
                href="mailto:hi@notnick.io"
                title="hi@notnick.io"
                target="_blank"
              >
                hi@notnick.io
              </Link>
            </p>
          </div>
        </section>
        <div className="mt-16 flex items-center justify-between">
          <Link className="text-blue-500 font-semibold hover:underline flex items-center" href="/" title="Go back home">
            <FiArrowLeft className="mr-1 text-xl" />
            Go back home
          </Link>
          <Button
            title="Download"
            onClick={() => {
              const link = document.createElement("a");
              link.href = `/legal/privacy-policy/${new Date().getFullYear()}/privacy-policy.pdf`;
              link.download = "privacy-policy.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download <FiDownload className="ml-2 hover:scale-110 duration-150" />
          </Button>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
