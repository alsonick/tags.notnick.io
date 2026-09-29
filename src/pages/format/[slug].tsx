import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { TEMPLATE_STRING_FORMAT_LIST } from "@/lib/template-string-format-list";
import { returnComputedFormatText } from "@/lib/return-computed-format-text";
import { TemplatePattern } from "@/components/format/TemplatePattern";
import { describeConstraint } from "@/lib/describe-constraint";
import { ADDITIONAL_FORMATS } from "@/lib/additional-formats";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { BackLink } from "@/components/BackLink";
import { FORMAT_LIST } from "@/lib/format-list";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { success } from "@/lib/success";
import { GetServerSideProps } from "next";
import { FiCopy } from "react-icons/fi";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import copy from "copy-to-clipboard";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { toast } from "sonner";
import Link from "next/link";

const Slug: NextPage<{ slug: string }> = ({ slug }) => {
  const computedFormatTextLyricsTemplateTitle = returnComputedFormatText(slug);
  const templates = TEMPLATE_STRING_FORMAT_LIST.find((f) => f.filter == slug);
  const isAdditional = ADDITIONAL_FORMATS.includes(slug);

  return (
    <Container>
      <Seo
        seoTitle={`${computedFormatTextLyricsTemplateTitle} Format | Lyrics Tags Generator`}
        seoDescription={`YouTube tag format string templates for ${computedFormatTextLyricsTemplateTitle} videos. See the exact templates Lyrics Tags Generator uses to build tags for this format.`}
        path={`/format/${slug}`}
      />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <PageHeader
          eyebrow={isAdditional ? "Additional Format" : "Format"}
          title={computedFormatTextLyricsTemplateTitle.length ? computedFormatTextLyricsTemplateTitle : "None"}
          description={
            isAdditional ? (
              <>
                Added on top of any format when you append the{" "}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base dark:bg-neutral-800">
                  \{slug}
                </code>{" "}
                flag after the song.
              </>
            ) : (
              "Each format has several templates. The one used depends on how many featured artists are present and whether TikTok tags are enabled."
            )
          }
        >
          <div className="mt-6 flex flex-wrap gap-1.5">
            {FORMAT_LIST.map((format) => (
              <Link
                className={cn(
                  "rounded-full border px-3 py-1 text-base transition-colors",
                  format.slug === slug
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "text-gray-600 hover:border-gray-300 hover:text-black dark:text-gray-400 dark:hover:border-neutral-700 dark:hover:text-white"
                )}
                href={`/format/${format.slug}`}
                key={format.slug}
              >
                {format.name}
              </Link>
            ))}
          </div>
        </PageHeader>
        <div className="flex flex-col gap-4 mt-8 mb-auto">
          {templates
            ? templates.formats.map((format) => {
                const patterns = format.template.split(",").filter(Boolean);

                return (
                  <section className="surface overflow-hidden" key={format.constraint}>
                    <div className="flex items-center justify-between gap-4 border-b px-5 py-3.5">
                      <div className="min-w-0">
                        <h2 className="font-semibold text-black dark:text-white">
                          {describeConstraint(format.constraint)}
                        </h2>
                        <p className="mt-0.5 truncate font-mono text-base text-gray-500 dark:text-gray-400">
                          {format.constraint}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-base tabular-nums text-gray-500 dark:text-gray-400">
                          {patterns.length} tags
                        </span>
                        <Button
                          type="button"
                          title="Copy template"
                          variant="secondary"
                          onClick={() => {
                            copy(format.template);
                            toast.success(success.message.copied);
                          }}
                        >
                          Copy <FiCopy />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-5 py-4">
                      {patterns.map((pattern, index) => (
                        <TemplatePattern key={`${index}-${pattern}`} pattern={pattern} />
                      ))}
                    </div>
                  </section>
                );
              })
            : null}
        </div>
        <div className="mt-16">
          <BackLink href="/format" text="All formats" />
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
