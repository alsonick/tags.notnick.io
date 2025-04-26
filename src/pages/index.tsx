import { returnComputedFormat } from "@/lib/return-computed-format";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { FiLoader, FiExternalLink } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { FiX, FiRepeat } from "react-icons/fi";
import { Button } from "../components/Button";
import { Response } from "@/types/response";
import { Input } from "@/components/Input";
import { Step } from "../components/Step";
import { FiCopy } from "react-icons/fi";
import copy from "copy-to-clipboard";

// Next.js
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [channelName, setChannelName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [format, setFormat] = useState("Lyrics");
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState("");
  const [data, setData] = useState<Response>();
  const [artist, setArtist] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [title, setTitle] = useState("");

  const artistRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if there are any commas in the title or artist
    if (/,/.test(title)) {
      toast.error("Please remove any commas , from the title or artist.");
      return;
    }

    // Process and compute final values locally without immediately updating state
    let finalArtist = artist;
    let finalFeatures = features;
    let finalTitle = title;

    if ((artist.includes(",") || artist.includes("-")) && title.length === 0) {
      let mainPart = artist;
      let title = "";

      if (artist.includes("-")) {
        const data = artist.split("-");
        mainPart = data[0].trim();
        title = data[1].trim().split("(")[0].trim();
      }

      const artistsArray = mainPart.split(",").map((a) => a.trim());

      finalArtist = artistsArray[0];
      finalFeatures = artistsArray.slice(1).join(", ");

      if (title) {
        finalTitle = title;
      }
    }

    if (artist.includes(",") || artist.includes("-")) {
      if (title.length) {
        toast.error(
          "The artist and title was already provided in the artist field. Please clear the title field!"
        );
        titleRef.current?.focus();
        return;
      }
    }

    // Starts the loading
    setLoading(true);

    // Use the computed values directly in the API call
    const response = await fetch(
      `/api/gen?title=${finalTitle}&artist=${finalArtist
        .trimStart()
        .trimEnd()}${
        finalFeatures.length
          ? `&features=${finalFeatures.trimStart().trimEnd()}`
          : "&features=none"
      }${
        channelName.length
          ? `&channel=${channelName.trimStart().trimEnd()}`
          : "&channel=none"
      }&tiktok=${
        tiktok === "" ? "false" : tiktok !== "true" ? "false" : "true"
      }&format=${format}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setArtist(finalArtist);
    setFeatures(finalFeatures);
    setTitle(finalTitle);

    // Check if the response is successful
    if (response.status === 200) {
      const data: Response = await response.json();

      // Check if the response isn't successful
      if (!data.success) {
        toast.error(data.error);
        setLoading(false);
        alert(data.error);
        return;
      }

      // Split the tags by commas and trim them
      const separated = data.tags.split(",").map((tag) => tag.trim());

      // Success
      toast.success("Tags generated successfully.");
      setData(data);
      setTags(separated);
      setLoading(false);
    }

    // Checks if the response is not "ok"
    if (!response.ok) {
      console.log(response);
      toast.error(`${response.statusText}.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const seoTitle = "Lyrics Tags Generator";
  const seoDescription = "Generate YouTube tags for your lyric videos.";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>{seoTitle} | YouTube</title>
        <meta name="description" content={seoDescription} key="desc" />
        <meta property="og:title" content={`${seoTitle} | YouTube`} />
        <meta name="theme-color" content="#f54bff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="twitter:title" content={`${seoTitle} | YouTube`} />
        <meta name="twitter:description" content={seoDescription} />
        <meta property="og:image" content="/tags.png" />
        <meta name="twitter:image" content="/tags.png" />
        <meta property="twitter:site" content="@nick" />
        <meta property="og:url" content="tags.notnick.io" />
        <meta property="og:site_name" content="tags.notnick.io" />
        <meta property="twitter:creator" content="@heynickn" />
        <meta property="og:type" content="website" />
        <meta name="twitter:image" content="/tags.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
      </Head>
      <div className="flex lg:hidden">
        <p className="text-2xl text-center font-light">
          Whoop. This is awkward! This site only supports desktop size screens.
        </p>
      </div>
      <nav
        className={`lg:flex items-center fixed justify-between h-20 w-full px-20 bg-white hidden top-0 z-50 transition-shadow duration-500 ${
          scrolled ? "fixed shadow-md h-20" : "fixed shadow-none"
        }`}
      >
        <div className="flex items-center">
          <div className="flex justify-center items-center w-fit h-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              fill="currentColor"
              className="bi bi-youtube"
              viewBox="0 0 16 16"
            >
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
            </svg>
          </div>

          <h1 className="font-bold tracking-tighter text-xl ml-3">
            Lyrics Tags Generator
          </h1>
        </div>

        <div className="flex">
          <Link
            className="font-semibold hover:underline mr-10 flex items-center"
            href="https://github.com/alsonick/lyrics-tags-generator/issues/new?template=Blank+issue"
            target="_blank"
          >
            Submit Suggestion <FiExternalLink className="ml-1 text-xl" />
          </Link>
          <Link
            className="font-semibold hover:underline flex items-center mr-10"
            href="https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot"
            target="_blank"
          >
            Invite Discord Bot <FiExternalLink className="ml-1 text-xl" />
          </Link>
          <Link
            className="font-semibold hover:underline flex items-center"
            href=""
            target="_blank"
          >
            Documentation <FiExternalLink className="ml-1 text-xl" />
          </Link>
        </div>
      </nav>
      <main className="lg:flex flex-col py-32 h-full px-2 sm:w-[55rem] w-[95%] hidden">
        <header className="flex flex-col items-center">
          <h1 className="text-6xl font-bold tracking-tighter">{seoTitle} ✍️</h1>
          <p className="text-gray-800 mt-4 text-xl font-medium">
            {seoDescription}
          </p>
        </header>
        <form onSubmit={submit} className="flex flex-col">
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col h-60 w-full">
              <Step step={1} text="Artist" />
              <Input
                onChange={(e) => setArtist(e.target.value)}
                placeholder="The Chainsmokers"
                required={true}
                ref={artistRef}
                value={artist}
              />
              <p className="text-xs mt-1">
                Any special characters are allowed except commas ,.{" "}
                <span className="text-yellow-600 font-semibold">Required*</span>
              </p>
              <br />
              <i className="text-xs border-l-4 pl-2 opacity-65">
                {" "}
                If you've provided the artist field in the format{" "}
                <b>
                  `[artist], [feat](optional)... - [title] [format](optional)`
                </b>{" "}
                then you can leave out the title field.
              </i>
            </section>
            <section className="flex flex-col h-60 w-full">
              <Step step={2} text="Title" />
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Don't Let Me Down"
                required={!artist.length}
                ref={titleRef}
                value={title}
              />
              <p className="text-xs mt-1">
                Please remove any commas , if there are any.{" "}
                <span className="text-yellow-600 font-semibold">Required*</span>
              </p>
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={3} text="Features" />
              <Input
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Daya"
                value={features}
                required={false}
              />
              <p className="text-xs mt-1">
                Please use a comma , to separate feature artists.
              </p>
            </section>
            <section className="flex flex-col w-full">
              <Step step={4} text="TikTok" />
              <Input
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="false"
                required={false}
                value={tiktok}
              />
              <p className="text-xs mt-1">
                Is the song popular on TikTok? Type "true" if so.{" "}
              </p>
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={5} text="Channel" />
              <Input
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Aquila"
                value={channelName}
                required={false}
              />
              <p className="text-xs mt-1">
                Enter the name of the YouTube Channel.
              </p>
            </section>
            <section className="flex flex-col w-full">
              <Step step={6} text="Format" />
              <div className="relative w-full">
                <select
                  className="appearance-none border w-full rounded-lg p-2 px-4 pr-10 outline-none focus:ring focus:ring-black duration-300"
                  onChange={(e) => setFormat(e.target.value)}
                  value={format}
                >
                  <option value="lyrics">Lyrics</option>
                  <option value="bassboosted">Bass Boosted</option>
                  <option value="nightcore">Nightcore/Sped Up</option>
                  <option value="slowedreverb">Slowed/Reverb</option>
                  <option value="letra">Letra</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      d="M19 9l-7 7-7-7"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs mt-1">
                Select the desired format.{" "}
                <span className="text-yellow-600 font-semibold">Required*</span>
              </p>
            </section>
          </div>
          <div className="w-full justify-between items-center flex mt-6 border-b pb-4">
            <div className="ml-auto flex">
              <div className="mr-4">
                <Button
                  onClick={(e) => {
                    e.preventDefault();

                    if (!tags.length) {
                      toast.error("Please fill out the required fields.");
                      return;
                    }

                    const shuffled = [...tags];

                    for (let i = shuffled.length - 1; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }

                    setTags(shuffled);
                    toast.success("Tags shuffled successfully.");
                  }}
                >
                  Shuffle <FiRepeat className="ml-2" />
                </Button>
              </div>
              <Button title="Generate tags">
                Generate <FiLoader className="ml-2" />
              </Button>
            </div>
          </div>
        </form>
        {loading ? (
          <div className="mt-28 flex justify-center items-center">
            <LoadingIndicator />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="border p-4 mt-4 rounded-xl">
              {tags.length > 0 && (
                <h2 className="text-2xl text-left font-light">
                  Tags generated for <i>{data?.title}</i> by{" "}
                  <b>{data?.artist}</b> 🤖
                </h2>
              )}
              <div className="flex flex-wrap gap-4 my-4 mt-6">
                {tags.length ? (
                  <>
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center border p-2 px-4 rounded-xl
                        hover:cursor-pointer w-fit duration-300 hover:shadow-lg"
                        onClick={() => {
                          const filtered = tags.filter((t) => t !== tag);
                          setTags(filtered);
                        }}
                      >
                        <p className="font-semibold">{tag}</p>
                        <FiX className="text-lg ml-1" />
                      </div>
                    ))}
                  </>
                ) : (
                  <h3 className="text-2xl font-light">
                    Click the "Generate" button to generate your tags. 🤖
                  </h3>
                )}
              </div>
            </div>
            {tags.length > 0 && (
              <Link
                title="Click to view json representation data."
                className="text-sm text-center mt-5 underline"
                target="_blank"
                href={data?.url ?? ""}
              >
                Click to view json representation data.
              </Link>
            )}
            <div className="flex w-full mt-4 items-center">
              <p
                className="text-sm"
                style={{
                  color: tags.join(",  ").length > 500 ? "red" : "black",
                  fontWeight: tags.join(",  ").length > 500 ? "500" : "normal",
                }}
              >
                {tags.join(",  ").length}/500
              </p>

              <Button
                title="Copy generated tags"
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  if (!tags.length) {
                    toast.error(
                      "Please generate the tags before you copy to clipboard."
                    );
                    return;
                  }
                  copy(tags.join(", "));
                  toast.success("Tags copied to the clipboard.");
                }}
              >
                Copy generated tags <FiCopy className="ml-2" />
              </Button>
            </div>
            {tags.join(",  ").length > 500 && (
              <p className="mt-4 text-sm text-red-500">
                Please delete the least suitable tags for your case.
              </p>
            )}
            {tags.length > 0 && (
              <div className="flex flex-col mt-8 border-t pt-4">
                <h3 className="text-2xl font-bold">Suggested:</h3>
                {data?.extras.titles.split("=").map((title) => (
                  <div
                    className="flex items-center justify-between w-full mt-4"
                    key={title}
                  >
                    <h4 className="text-xl">{title}</h4>
                    <Button
                      onClick={() => {
                        copy(title);
                        toast.success("Copied!");
                      }}
                    >
                      Copy <FiCopy className="ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {tags.length > 0 && (
              <div className="mt-8 flex flex-col border-t pt-4">
                <h3 className="text-2xl font-bold">Hashtags:</h3>
                <div className="flex items-center justify-between w-full">
                  <div className="flex">
                    <p className="text-xl mr-4">
                      #{data?.artist.replace(" ", "")}
                    </p>
                    <p className="text-xl mr-4">
                      #{data?.title.replace("'", "").replaceAll(" ", "")}
                    </p>
                    <p className="text-xl">#{returnComputedFormat(format)}</p>
                  </div>
                  <Button
                    onClick={() => {
                      const textToCopy = `#${data?.artist.replace(
                        " ",
                        ""
                      )} #${data?.title
                        .replace("'", "")
                        .replaceAll(" ", "")} #${returnComputedFormat(format)}`;
                      copy(textToCopy);
                      toast.success("Hashtags copied to the clipboard.");
                    }}
                  >
                    Copy <FiCopy className="ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        <footer className="bottom-0 left-0 mt-28 text-sm pb-4">
          <h1 className="font-bold text-lg text-gray-800">Nicholas Njoki</h1>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} | All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Made with{" "}
            <Link
              className="font-bold hover:underline"
              href="https://nextjs.org/"
              target="_blank"
            >
              Next.js
            </Link>
            ,{" "}
            <Link
              className="font-bold hover:underline"
              href="https://tailwindcss.com/"
              target="_blank"
            >
              Tailwind
            </Link>{" "}
            &{" "}
            <Link
              className="font-bold hover:underline"
              href="https://vercel.com/"
              target="_blank"
            >
              Vercel
            </Link>
            .
          </p>
          <p className="text-gray-600 text-xs">
            Built with ❤️ by{" "}
            <Link
              href="https://github.com/alsonick"
              className="font-bold hover:underline"
              target="_blank"
            >
              Nicholas Njoki
            </Link>
            .
          </p>
        </footer>
      </main>
      <ToastContainer />
    </div>
  );
}
