import {
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED,
  CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT,
  FEATURES_INPUT_FIELD_CHARACTER_LIMIT,
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT,
  TITLE_INPUT_FIELD_CHARACTER_LIMIT,
} from "@/lib/constants";
import { returnComputedFormat } from "@/lib/return-computed-format";
import { FiX, FiRepeat, FiTrash, FiDelete } from "react-icons/fi";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { NavYouTubeLogo } from "@/components/NavYouTubeLogo";
import { CharacterLimit } from "@/components/CharacterLimit";
import { FiLoader, FiExternalLink } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { removeEmojis } from "@/lib/remove-emojis";
import { Button } from "../components/Button";
import { Response } from "@/types/response";
import { Input } from "@/components/Input";
import { Step } from "../components/Step";
import { FiCopy } from "react-icons/fi";
import { Seo } from "@/components/Seo";
import copy from "copy-to-clipboard";

// Next.js
import Link from "next/link";

export default function Home() {
  const [overflowTagsDeleted, setOverflowTagsDeleted] = useState(false);
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

  const channelNameRef = useRef<HTMLInputElement | null>(null);
  const featuresRef = useRef<HTMLInputElement | null>(null);
  const artistRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if there are any commas in the title or artist
    if (/,/.test(title)) {
      toast.error("Please remove any commas , from the title or artist.");
      return;
    }

    // Checks if the artist field reaches the character limit
    if (artist.includes("-") || artist.includes(",")) {
      if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED) {
        toast.error("Character limit exceeded.");
        artistRef.current?.focus();
        return;
      }
    } else {
      if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT) {
        toast.error("Character limit exceeded.");
        artistRef.current?.focus();
        return;
      }
    }

    // Checks if the title field reaches the character limit
    if (title.length > TITLE_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error("Character limit exceeded.");
      titleRef.current?.focus();
      return;
    }

    // Checks if the features field reaches the character limit
    if (features.length > FEATURES_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error("Character limit exceeded.");
      featuresRef.current?.focus();
      return;
    }

    // Checks if the channel name field reaches the character limit
    if (channelName.length > CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error("Character limit exceeded.");
      channelNameRef.current?.focus();
      return;
    }

    // Process and compute final values locally without immediately updating state
    let finalFeatures = features;
    let finalArtist = artist;
    let finalFormat = format;
    let finalTitle = title;

    // Checks if the artist and title is not provided in the artist field.
    if (!artist.includes("-")) {
      if (!title.length) {
        toast.error("Please provide the title.");
        titleRef.current?.focus();
        return;
      }
    }

    // Modified if statement to check for both standard hyphen and em dash
    if (
      (artist.includes(",") || artist.includes("-") || artist.includes("—")) &&
      title.length === 0
    ) {
      // Determine which separator to use for splitting (standard hyphen or em dash)
      const separator = artist.includes("—") ? "—" : "-";
      const data = artist.split(separator);
      let mainPart = artist;
      let extractedTitle = "";

      if (artist.includes(separator)) {
        const titleFormatString = data[1].trim();
        mainPart = data[0].trim();

        // Extract title before any format indicators
        if (titleFormatString.includes("(")) {
          extractedTitle = removeEmojis(titleFormatString.split("(")[0].trim());
        } else if (titleFormatString.includes("[")) {
          extractedTitle = removeEmojis(titleFormatString.split("[")[0].trim());
        } else {
          extractedTitle = removeEmojis(titleFormatString);
        }

        // Process format from parentheses or brackets
        let formatText = "";
        if (titleFormatString.includes("(")) {
          // Extract text within parentheses
          const match = titleFormatString.match(/\(([^)]+)\)/);
          if (match && match[1]) {
            formatText = match[1].trim();
          }
        } else if (titleFormatString.includes("[")) {
          // Extract text within brackets
          const match = titleFormatString.match(/\[([^\]]+)\]/);
          if (match && match[1]) {
            formatText = match[1].trim();
          }
        }

        // If format text was found, process it
        if (formatText) {
          // Get standardized format name and ensure it's lowercase for the API
          finalFormat = returnComputedFormat(formatText).toLowerCase();
        }
      }

      // Process artist and features from the main part
      const artistsArray = mainPart.split(",").map((a) => a.trim());
      finalArtist = artistsArray[0];
      finalFeatures = artistsArray.slice(1).join(", ");

      if (extractedTitle) {
        finalTitle = extractedTitle;
      }
    }

    // Error if artist includes separators but title is already specified
    if (artist.includes(",") || artist.includes("-") || artist.includes("—")) {
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
      }&format=${finalFormat}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Update state with the final computed values
    setArtist(finalArtist);
    setFeatures(finalFeatures);
    setFormat(finalFormat);
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
      setTags(separated);
      setLoading(false);
      setData(data);

      setOverflowTagsDeleted(false);
      setChannelName("");
      setFeatures("");
      setArtist("");
      setTiktok("");
      setTitle("");
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
      <Seo seoTitle={seoTitle} seoDescription={seoDescription} />
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
          <NavYouTubeLogo />
          <div className="flex flex-col text-left gap-0 mb-[2px] ">
            <h1 className="font-bold tracking-tighter text-xl ml-3">
              Lyrics Tags Generator
            </h1>
            <p className="ml-3 text-xs font-semibold">tags.notnick.io</p>
          </div>
        </div>
        <div className="flex items-center">
          <Link
            className="font-semibold hover:underline mr-10 flex items-center"
            href="https://github.com/alsonick/lyrics-tags-generator-docs/issues/new"
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
            href="https://github.com/alsonick/lyrics-tags-generator-docs"
            target="_blank"
          >
            Documentation <FiExternalLink className="ml-1 text-xl" />
          </Link>
        </div>
      </nav>
      <main className="lg:flex flex-col py-32 h-full px-2 sm:w-[55rem] w-[95%] hidden">
        <header className="flex flex-col items-center mt-5">
          <h1 className="text-6xl font-bold tracking-tighter">{seoTitle} ✍️</h1>
          <p className="text-gray-800 mt-4 text-xl font-medium">
            {seoDescription}
          </p>
        </header>
        <form onSubmit={submit} className="flex flex-col">
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
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
              <CharacterLimit
                limit={
                  artist.includes("-") || artist.includes(",")
                    ? ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED
                    : ARTIST_INPUT_FIELD_CHARACTER_LIMIT
                }
                text={artist}
              />
            </section>
            <section className="flex flex-col w-full">
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
              <CharacterLimit
                limit={TITLE_INPUT_FIELD_CHARACTER_LIMIT}
                text={title}
              />
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={3} text="Features" />
              <Input
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Daya"
                ref={featuresRef}
                value={features}
                required={false}
              />
              <p className="text-xs mt-1">
                Please use a comma , to separate feature artists.
              </p>
              <CharacterLimit
                limit={FEATURES_INPUT_FIELD_CHARACTER_LIMIT}
                text={features}
              />
            </section>
            <section className="flex flex-col w-full">
              <Step step={4} text="Channel" />
              <Input
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Aquila"
                ref={channelNameRef}
                value={channelName}
                required={false}
              />
              <p className="text-xs mt-1">
                Enter the name of the YouTube Channel.
              </p>
              <CharacterLimit
                limit={CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT}
                text={channelName}
              />
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={5} text="TikTok" />
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
            <section className="flex flex-col w-full">
              <Step step={6} text="Format" />
              <div className="relative w-full">
                <select
                  className="appearance-none border w-full p-2 px-4 pr-10 flex items-center rounded-md focus:outline-2"
                  onChange={(e) => setFormat(e.target.value)}
                  value={format}
                >
                  <option value="lyrics">Lyrics</option>
                  <option value="bassboosted">Bass Boosted</option>
                  <option value="nightcore">Nightcore/Sped Up</option>
                  <option value="slowedreverb">Slowed/Reverb</option>
                  <option value="letra">Letra</option>
                  <option value="phonk">Phonk</option>
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
              {" "}
              <div className="mr-2">
                <Button
                  type="button"
                  title="Generate tags"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!tags.length) {
                      toast.error("There's nothing to clear.");
                      return;
                    }
                    setTags([]);
                  }}
                >
                  Clear <FiTrash className="ml-2" />
                </Button>
              </div>
              <Button type="submit" title="Generate tags">
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
            <div className="flex w-full mt-6 items-center">
              <CharacterLimit text={tags.join(",  ")} limit={500} />
              <div className="flex items-center ml-auto">
                <div className="mr-4">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();

                      if (!tags.length) {
                        if (!artist.length) {
                          toast.error("Please fill out the artist field.");
                          artistRef.current?.focus();
                          return;
                        }

                        if (!artist.includes("-") && !artist.includes(",")) {
                          if (!title.length) {
                            toast.error("Please fill out the title field.");
                            titleRef.current?.focus();
                            return;
                          }
                        }

                        toast.error("Please generate the tags first.");
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
            </div>
            {tags.join(",  ").length > 500 && (
              <p className="mt-4 text-sm text-red-500">
                Please delete the least suitable tags for your case.
              </p>
            )}
            {data?.tagsToBeRemoved.length && (
              <>
                <div className="border p-4 mt-4 rounded-xl">
                  <h3 className="text-2xl font-light">
                    Recommended tags to delete 🤖
                  </h3>
                  <div className="flex flex-wrap gap-4 my-4 mt-6">
                    {data?.tagsToBeRemoved.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center border p-2 px-4 rounded-xl w-fit"
                      >
                        <p className="font-semibold">{tag}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  {overflowTagsDeleted && (
                    <p className="text-sm text-green-500">Deleted.</p>
                  )}
                  <Button
                    style={{ marginLeft: "auto" }}
                    onClick={() => {
                      let newTags = tags.filter(
                        (tag) =>
                          !data?.tagsToBeRemoved?.some(
                            (tagToRemove) =>
                              tagToRemove.toLowerCase() === tag.toLowerCase()
                          )
                      );

                      setTags(newTags);

                      if (!overflowTagsDeleted) {
                        toast.success("Tags successfully removed.");
                      } else {
                        toast.error(
                          "Recommended tags have already been removed."
                        );
                      }
                      setOverflowTagsDeleted(true);
                    }}
                  >
                    Delete tags <FiDelete className="ml-2" />
                  </Button>
                </div>
              </>
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
                    <p className="text-xl">
                      #
                      {returnComputedFormat(format)[0].toUpperCase() +
                        format.slice(1)}
                    </p>
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
