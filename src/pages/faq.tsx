import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion";
import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { DevelopmentNav } from "@/components/DevelopmentNav";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { FiArrowLeft } from "react-icons/fi";
import { Badge } from "@/components/badge";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import { seo } from "@/lib/seo/seo";

// Next.js
import Link from "next/link";

export default function FAQ() {
  return (
    <Container>
      <Seo seoTitle={seo.page.faq.title} seoDescription={seo.page.faq.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
      <Nav />
      <MainWrapper>
        <h1 className="text-4xl font-black tracking-tight mt-8">FAQ</h1>
        <div className="mt-8 text-gray-800 mb-auto">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl text-black">
                Do you provide an Application Programming Interface (API)?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-800">
                Yes! Our{" "}
                <Link
                  className="text-blue-500 font-semibold hover:underline"
                  title="Application Programming Interface"
                  href="https://en.wikipedia.org/wiki/API"
                  target="_blank"
                >
                  Application Programming Interface
                </Link>{" "}
                is completely free to use, Our available endpoints are:{" "}
                <Badge variant={"secondary"}>GET /generate</Badge> & <Badge variant={"secondary"}>GET /length</Badge>.
                Please refer to our official{" "}
                <Link
                  href="https://github.com/alsonick/lyrics-tags-generator-docs"
                  className="text-blue-500 font-semibold hover:underline"
                  title="documentation"
                  target="_blank"
                >
                  documentation
                </Link>{" "}
                or{" "}
                <Link
                  className="text-blue-500 font-semibold hover:underline"
                  href="mailto:hi@notnick.io"
                  title="contact me"
                >
                  contact me
                </Link>{" "}
                if you need any guidance in setting up or if you have any general questions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl text-black">Is Lyrics Tags Generator open source?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-800">
                No. All our source code is proprietary software except for our Python script that interacts with Lyrics
                Tags Generator (
                <Link
                  className="text-blue-500 font-semibold hover:underline"
                  href="https://github.com/alsonick/tags-py"
                  title="tags.py"
                  target="_blank"
                >
                  tags.py
                </Link>
                ), which is under the{" "}
                <Link
                  href="https://github.com/alsonick/tags-py/blob/main/LICENSE"
                  className="text-blue-500 font-semibold hover:underline"
                  title="MIT License"
                  target="_blank"
                >
                  MIT License
                </Link>
                .{" "}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl text-black">How does it work?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-800">
                When you provide us data about a song like:{" "}
                <Badge variant={"secondary"}>Rex Orange County - Pluto Projector</Badge>, we basically break down the
                entire string and split the component parts into fragments, we can also break down more complex strings
                like with songs that feature other artists:{" "}
                <Badge variant={"secondary"}>JVKE, Tilly Birds, John Michael Howell - colors</Badge>, or songs that are
                remixes: <Badge variant={"secondary"}>Ro Ransom, Kensei Abbot - See Me Fall (Y2K Remix)</Badge>.
                <br />
                <br />
                After the string is broken down into fragments, we basically replace the parts in our format string
                template with the fragments, for example; our format string template might look like this:{" "}
                <Badge
                  variant={"secondary"}
                >{`{artist} {title} lyrics,{title} lyrics,lyrics {title},{artist} {title}`}</Badge>{" "}
                and if we take the first song example from above (
                <Badge variant={"secondary"}>Rex Orange County - Pluto Projector</Badge>), then the{" "}
                <Badge variant={"secondary"}>Rex Orange County</Badge> fragment will be placed in all the{" "}
                <Badge variant={"secondary"}>{`{artist}`}</Badge> parts, and the{" "}
                <Badge variant={"secondary"}>Pluto Projector</Badge> fragment will be placed in all the{" "}
                <Badge variant={"secondary"}>{`{title}`}</Badge> parts, giving us this final result:
                <br />
                <div className="flex flex-wrap gap-4 my-4 mt-6">
                  {[
                    "Rex Orange County Pluto Projector lyrics",
                    "Pluto Projector lyrics",
                    "lyrics Pluto Projector",
                    "Rex Orange County Pluto Projector",
                  ].map((tag) => (
                    <div className="flex items-center border p-2 px-4 rounded-lg w-fit duration-300" key={tag}>
                      <p className="text-base text-black">{tag.toLowerCase()}</p>
                    </div>
                  ))}
                </div>
                You can also create your own custom format string template, though this feature is only available on the
                browser client. Please refer to the{" "}
                <Link
                  href="https://github.com/alsonick/lyrics-tags-generator-docs"
                  className="text-blue-500 font-semibold hover:underline"
                  title="documentation"
                  target="_blank"
                >
                  documentation
                </Link>{" "}
                for more information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl text-black">Who is this for?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-800">
                This tool is built for anyone running any type of promotional music channel (typically lyric channels)
                on{" "}
                <Link
                  className="text-blue-500 font-semibold hover:underline"
                  href="https://www.youtube.com/"
                  title="YouTube"
                  target="_blank"
                >
                  YouTube
                </Link>
                , whether you’re managing a single channel or an entire collective. We know that typing out metadata
                like tags, titles, and hashtags for every video can get pretty repetitive. All you need to do is give us
                the necessary data about a song, and we’ll handle the rest.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-16 flex items-center justify-between">
            <Link
              className="text-blue-500 font-semibold hover:underline flex items-center"
              title="Go back home"
              href="/"
            >
              <FiArrowLeft className="mr-1 text-lg" />
              Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
