import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion';
import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { Badge } from '@/components/shadcn/badge';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { BackLink } from '@/components/BackLink';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { Tag } from '@/components/Tag';
import { TemplatePattern } from '@/components/format/TemplatePattern';
import { FeedbackModal } from '@/components/FeedbackModal';
import { Button, buttonVariants } from '@/components/Button';
import { FiCode, FiGithub, FiHeart, FiLayers, FiMail, FiMessageSquare, FiUsers } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useState } from 'react';
import { seo } from '@/lib/seo/seo';
import Link from 'next/link';

const EXAMPLE_TEMPLATE = '{artist} {title} lyrics,{title} lyrics,lyrics {title},{artist} {title}';

const QuestionIcon = ({ icon: Icon }: { icon: IconType }) => (
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background text-gray-500 shadow-sm dark:text-gray-400">
    <Icon className="text-sm" />
  </span>
);

export default function FAQ() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <Container>
      <Seo
        seoTitle={seo.page.faq.title}
        seoDescription={seo.page.faq.description}
        path="/faq"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do you provide an Application Programming Interface (API)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Our Application Programming Interface is completely free to use. Our available endpoints are GET /v1/generate and GET /v1/length. Please refer to our official documentation or contact us if you need any guidance in setting up or if you have any general questions.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does anyone use Lyrics Tags Generator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! The collective group earlyentry.io are using Lyrics Tags Generator in their uploading automation system, they specifically use it to generate metadata such as tags for some of their collective channels on YouTube.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Lyrics Tags Generator open source?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! The full source code is available on GitHub at https://github.com/alsonick/tags.notnick.io.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does it work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'When you provide data about a song like "Rex Orange County - Pluto Projector", the string is broken down into fragments (artist, title, features) and those fragments are placed into a format string template to produce a ready-to-use list of YouTube tags. You can also create your own custom format string template on the browser client.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who is this for?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'This tool is built for anyone running any type of promotional music channel (typically lyric channels) on YouTube, whether you are managing a single channel or an entire collective. Provide the necessary metadata about a song and the tool handles the rest.',
                },
              },
            ],
          },
        ]}
      />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <PageHeader
          eyebrow="Help"
          title={seo.page.faq.heading}
          description="Answers to common questions about Lyrics Tags Generator."
        />
        <div className="mt-8 mb-auto">
          <Accordion type="multiple" defaultValue={['api']} className="surface px-6">
            <AccordionItem value="api">
              <AccordionTrigger className="group/trigger items-center py-5 text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-3">
                  <QuestionIcon icon={FiCode} />
                  <span className="transition-colors group-hover/trigger:text-brand-700 dark:group-hover/trigger:text-brand-400">
                    Do you provide an Application Programming Interface (API)?
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-11 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                Yes! Our{' '}
                <Link
                  className="link"
                  title="Application Programming Interface"
                  href="https://en.wikipedia.org/wiki/API"
                  target="_blank"
                >
                  Application Programming Interface
                </Link>{' '}
                is completely free to use, Our available endpoints are:{' '}
                <Badge variant={'secondary'}>GET /v1/generate</Badge> &{' '}
                <Badge variant={'secondary'}>GET /v1/length</Badge>. Please refer to our official{' '}
                <Link
                  href="https://github.com/alsonick/lyrics-tags-generator-docs"
                  className="link"
                  title="documentation"
                  target="_blank"
                >
                  documentation
                </Link>{' '}
                or{' '}
                <Link className="link" href="mailto:hi@notnick.io" title="contact me">
                  contact me
                </Link>{' '}
                if you need any guidance in setting up or if you have any general questions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="users">
              <AccordionTrigger className="group/trigger items-center py-5 text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-3">
                  <QuestionIcon icon={FiUsers} />
                  <span className="transition-colors group-hover/trigger:text-brand-700 dark:group-hover/trigger:text-brand-400">
                    Does anyone use Lyrics Tags Generator?
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-11 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                Yes! The collective group{' '}
                <Link className="link" href="https://earlyentry.io" title="earlyentry.io" target="_blank">
                  earlyentry.io
                </Link>{' '}
                are using Lyrics Tags Generator in their uploading automation system, they specifically use it to
                generate metadata such as tags for some of their collective channels on{' '}
                <Link className="link" href="https://www.youtube.com/" title="YouTube" target="_blank">
                  YouTube
                </Link>
                .
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="open-source">
              <AccordionTrigger className="group/trigger items-center py-5 text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-3">
                  <QuestionIcon icon={FiGithub} />
                  <span className="transition-colors group-hover/trigger:text-brand-700 dark:group-hover/trigger:text-brand-400">
                    Is Lyrics Tags Generator open source?
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-11 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                Yes!{' '}
                <Link
                  className="link"
                  href="https://github.com/alsonick/tags.notnick.io"
                  title="Click here to view our GitHub repository"
                  target="_blank"
                >
                  Click here to view our GitHub repository
                </Link>
                .
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-it-works">
              <AccordionTrigger className="group/trigger items-center py-5 text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-3">
                  <QuestionIcon icon={FiLayers} />
                  <span className="transition-colors group-hover/trigger:text-brand-700 dark:group-hover/trigger:text-brand-400">
                    How does it work?
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-11 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                When you provide us data about a song like:{' '}
                <Badge variant={'secondary'}>Rex Orange County - Pluto Projector</Badge>, we basically break down the
                entire string and split the component parts into fragments, we can also break down more complex strings
                like with songs that feature other artists:{' '}
                <Badge variant={'secondary'}>JVKE, Tilly Birds, John Michael Howell - colors</Badge>, or songs that are
                remixes: <Badge variant={'secondary'}>Ro Ransom, Kensei Abbot - See Me Fall (Y2K Remix)</Badge>.
                <br />
                <br />
                After the string is broken down into fragments, we basically replace the parts in our format string
                template with the fragments, for example; our format string template might look like this:
                <span className="my-3 flex flex-wrap gap-1.5">
                  {EXAMPLE_TEMPLATE.split(',').map((pattern) => (
                    <TemplatePattern key={pattern} pattern={pattern} className="px-1.5 py-0.5 text-[0.85em]" />
                  ))}
                </span>
                And if we take the first song example from above (
                <Badge variant={'secondary'}>Rex Orange County - Pluto Projector</Badge>), then the{' '}
                <Badge variant={'secondary'}>Rex Orange County</Badge> fragment will be placed in all the{' '}
                <Badge variant={'secondary'}>{`{artist}`}</Badge> parts, and the{' '}
                <Badge variant={'secondary'}>Pluto Projector</Badge> fragment will be placed in all the{' '}
                <Badge variant={'secondary'}>{`{title}`}</Badge> parts, giving us this final result:
                <br />
                <div className="flex flex-wrap gap-2 my-4">
                  {[
                    'Rex Orange County Pluto Projector lyrics',
                    'Pluto Projector lyrics',
                    'lyrics Pluto Projector',
                    'Rex Orange County Pluto Projector',
                  ].map((tag) => (
                    <Tag key={tag} deletable={false} tag={tag.toLowerCase()} />
                  ))}
                </div>
                You can also create your own custom format string template, though this feature is only available on the
                browser client. Please refer to the{' '}
                <Link
                  href="https://github.com/alsonick/lyrics-tags-generator-docs"
                  className="link"
                  title="documentation"
                  target="_blank"
                >
                  documentation
                </Link>{' '}
                for more information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="audience">
              <AccordionTrigger className="group/trigger items-center py-5 text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-3">
                  <QuestionIcon icon={FiHeart} />
                  <span className="transition-colors group-hover/trigger:text-brand-700 dark:group-hover/trigger:text-brand-400">
                    Who is this for?
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-11 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                This tool is built for anyone running any type of promotional music channel (typically lyric channels)
                on{' '}
                <Link className="link" href="https://www.youtube.com/" title="YouTube" target="_blank">
                  YouTube
                </Link>
                , whether you’re managing a single channel or an entire collective. We know that typing out metadata
                like tags, titles, and hashtags for every video can get pretty repetitive. All you need to do is give us
                the necessary metadata about a song, and we’ll handle the rest.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="surface mt-6 flex items-center justify-between gap-6 bg-gray-50/70 p-6 dark:bg-neutral-900/50">
            <div>
              <h2 className="font-semibold text-black dark:text-white">Still have questions?</h2>
              <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                Reach out to me and I&apos;ll get back to you shortly.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button type="button" variant="secondary" onClick={() => setFeedbackOpen(true)}>
                Send feedback <FiMessageSquare />
              </Button>
              <Link className={buttonVariants()} href="mailto:hi@notnick.io" title="hi@notnick.io">
                Email me <FiMail />
              </Link>
            </div>
          </div>
          <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
          <div className="mt-12">
            <BackLink href="/" text="Go back home" />
          </div>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
