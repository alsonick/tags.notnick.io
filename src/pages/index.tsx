import {
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED,
  CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT,
  FEATURES_INPUT_FIELD_CHARACTER_LIMIT,
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT,
  TITLE_INPUT_FIELD_CHARACTER_LIMIT,
} from "@/lib/constants";
import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { FiX, FiRepeat, FiTrash, FiDelete, FiEdit } from "react-icons/fi";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { CharacterLimit } from "@/components/CharacterLimit";
import { countTagsLength } from "@/lib/count-tags-length";
import { ToastContainer, toast } from "react-toastify";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { Button } from "../components/Button";
import { Footer } from "@/components/Footer";
import { Response } from "@/types/response";
import { Input } from "@/components/Input";
import { Step } from "../components/Step";
import { FiLoader } from "react-icons/fi";
import { useState, useRef } from "react";
import { FiCopy } from "react-icons/fi";
import { success } from "@/lib/success";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import copy from "copy-to-clipboard";
import { error } from "@/lib/error";
import { GENRE } from "@/lib/genre";
import { seo } from "@/lib/seo/seo";

// Next.js
import Link from "next/link";
import { FORMAT } from "@/lib/format";

export default function Home() {
  const [overflowTagsDeleted, setOverflowTagsDeleted] = useState(false);
  const [originalTitles, setOriginalTitles] = useState<string[]>([]);
  const [channelName, setChannelName] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [format, setFormat] = useState("Lyrics");
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState("");
  const [data, setData] = useState<Response>();
  const [seoText, setSeoText] = useState("");
  const [genre, setGenre] = useState("None");
  const [artist, setArtist] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [title, setTitle] = useState("");
  const [verse, setVerse] = useState("");

  const channelNameRef = useRef<HTMLInputElement | null>(null);
  const featuresRef = useRef<HTMLInputElement | null>(null);
  const artistRef = useRef<HTMLInputElement | null>(null);
  const verseRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the artist field ends with ",-" which means the title wasn't provided.
    if (/,-$/.test(artist)) {
      toast.error(error.message.provideTitle);
      artistRef.current?.focus();
      return;
    }

    // Check if the artist field starts with ",-" which means the title wasn't provided.
    if (/^,-/.test(artist)) {
      toast.error(error.message.invalidFormat);
      artistRef.current?.focus();
      return;
    }

    // Check if there are any commas in the title
    if (/,/.test(title)) {
      toast.error(error.message.removeCommasFromTitle);
      return;
    }

    // Checks if the artist field reaches the character limit
    if (/[-,]/.test(artist)) {
      if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED) {
        toast.error(error.message.characterLimitExceeded);
        artistRef.current?.focus();
        return;
      }
    } else {
      if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT) {
        toast.error(error.message.characterLimitExceeded);
        artistRef.current?.focus();
        return;
      }
    }

    // Checks if the title field reaches the character limit
    if (title.length > TITLE_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error(error.message.characterLimitExceeded);
      titleRef.current?.focus();
      return;
    }

    // Checks if the features field reaches the character limit
    if (features.length > FEATURES_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error(error.message.characterLimitExceeded);
      featuresRef.current?.focus();
      return;
    }

    // Checks if the channel name field reaches the character limit.
    if (channelName.length > CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error(error.message.characterLimitExceeded);
      channelNameRef.current?.focus();
      return;
    }

    // Checks if the artist and title is not provided in the artist field.
    if (!/-/.test(artist)) {
      if (!title.length) {
        toast.error(error.message.provideTitle);
        titleRef.current?.focus();
        return;
      }
    }

    // Checks if verse contains any numbers or special characters.
    if (verse.length && !/^[a-zA-Z ,]*$/.test(verse)) {
      toast.error(error.message.removeSpecialCharactersAndNumbersExceptCommasVerse);
      verseRef.current?.focus();
      return;
    }

    // Checks if verse contains a comma, if does then we split the verses and check if there are more than 3 verses.
    if (verse.length && /,/.test(verse)) {
      const verseSplit = verse.split(",");

      // If there's more than 3 verses then send back a error response
      if (verseSplit.length > 3) {
        toast.error(error.message.threeVersesAreOnlyAllowed);
        verseRef.current?.focus();
        return;
      }
    }

    // Starts the loading
    setLoading(true);

    const response = await fetch(
      `/api/generate${title.length ? `?title=${encodeURIComponent(title)}` : "?title=none"}&artist=${encodeURIComponent(
        artist
      )}${Boolean(features.length) ? `&features=${encodeURIComponent(features.trim())}` : "&features=none"}${
        Boolean(channelName.length) ? `&channel=${encodeURIComponent(channelName.trim())}` : "&channel=none"
      }&tiktok=${tiktok === "" ? "false" : tiktok !== "true" ? "false" : "true"}&format=${encodeURIComponent(
        format
      )}&genre=${encodeURIComponent(genre)}${
        Boolean(verse.length) ? `&verse=${encodeURIComponent(verse)}` : "&verse=none"
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is successful
    if (response.status === 200) {
      const data: Response = await response.json();

      // Check if the response isn't successful
      if (!data.success) {
        toast.error(data.error);
        setLoading(false);
        return;
      }

      // Split the tags by commas and trim them
      const separated = data.tags.split(",").map((tag) => tag.trim());

      // Success
      toast.success(success.message.tagsGeneratedSuccessfully);
      setSeoText(data.extras.seo.text);
      setTags(separated);
      setLoading(false);
      setData(data);

      if (data.extras.titles) {
        setOriginalTitles(data.extras.titles.split("="));
        setTitles(data.extras.titles.split("="));
      }

      setOverflowTagsDeleted(false);
      setChannelName("");
      setFormat("Lyrics");
      setGenre("None");
      setFeatures("");
      setArtist("");
      setTiktok("");
      setVerse("");
      setTitle("");
    }

    // Checks if the response is not "ok"
    if (!response.ok) {
      toast.error(`${response.statusText}.`);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Seo seoTitle={seo.page.home.title} seoDescription={seo.page.home.description} />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <header className="flex flex-col items-center">
          <h1 className="text-6xl font-bold tracking-tighter">{seo.page.home.title} ✍️</h1>
          <p className="text-gray-800 mt-4 text-xl font-medium">{seo.page.home.description}</p>
        </header>
        <form onSubmit={submit} className="flex flex-col mt-6">
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
                Any special characters are allowed except commas.{" "}
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
              <p className="text-xs mt-1">Please remove any commas if there are any. </p>
              <CharacterLimit limit={TITLE_INPUT_FIELD_CHARACTER_LIMIT} text={title} />
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
              <p className="text-xs mt-1">Please use a comma to separate feature artists.</p>
              <CharacterLimit limit={FEATURES_INPUT_FIELD_CHARACTER_LIMIT} text={features} />
            </section>
            <section className="flex flex-col w-full">
              <Step step={4} text="Channel" />
              <Input
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Gold Coast Music"
                ref={channelNameRef}
                value={channelName}
                required={false}
              />
              <p className="text-xs mt-1">Enter the name of the YouTube Channel.</p>
              <CharacterLimit limit={CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT} text={channelName} />
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={5} text="TikTok" />
              <Input onChange={(e) => setTiktok(e.target.value)} placeholder="false" required={false} value={tiktok} />
              <p className="text-xs mt-1">Is the song popular on TikTok? Type "true" if so. </p>
            </section>
            <section className="flex flex-col w-full">
              <Step step={6} text="Format" />
              <div className="relative w-full">
                <select
                  className="appearance-none border w-full p-2 px-4 pr-10 flex items-center rounded-md focus:outline-2"
                  onChange={(e) => setFormat(e.target.value)}
                  value={format}
                >
                  <option value={FORMAT.lyrics}>Lyrics</option>
                  <option value={FORMAT.bassboosted}>Bass Boosted</option>
                  <option value={FORMAT.nightcore}>Nightcore/Sped Up</option>
                  <option value={FORMAT.slowedreverb}>Slowed/Reverb</option>
                  <option value={FORMAT.letra}>Letra</option>
                  <option value={FORMAT.phonk}>Phonk</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-gray-600" stroke="currentColor" viewBox="0 0 24 24" fill="none">
                    <path strokeLinejoin="round" strokeLinecap="round" d="M19 9l-7 7-7-7" strokeWidth={2} />
                  </svg>
                </div>
              </div>
              <p className="text-xs mt-1">Select the desired format.</p>
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={7} text="Genre" />
              <div className="relative w-full">
                <select
                  className="appearance-none border w-full p-2 px-4 pr-10 flex items-center rounded-md focus:outline-2"
                  onChange={(e) => setGenre(e.target.value)}
                  value={genre}
                >
                  <option value={GENRE.none}>None</option>
                  <option value={GENRE.country}>Country</option>
                  <option value={GENRE.latin}>Latin</option>
                  <option value={GENRE.phonk}>Phonk</option>
                  <option value={GENRE.pop}>Pop</option>
                  <option value={GENRE.rap}>Rap</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-gray-600" stroke="currentColor" viewBox="0 0 24 24" fill="none">
                    <path strokeLinejoin="round" strokeLinecap="round" d="M19 9l-7 7-7-7" strokeWidth={2} />
                  </svg>
                </div>
              </div>
              <p className="text-xs mt-1">Select the desired genre.</p>
            </section>
            <section className="flex flex-col w-full">
              <Step step={8} text="Verse" />
              <Input
                onChange={(e) => setVerse(e.target.value)}
                placeholder="dont let me down,said dont let me down"
                required={false}
                ref={verseRef}
                value={verse}
              />
              <p className="text-xs mt-1">Popular verse? Paste them in here. Limit is 3, separate them by commas.</p>
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
                      toast.error(error.message.nothingToClear);
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
                <h2 className="text-2xl text-left border-b pb-2">
                  <i>{data?.title}</i> by <b>{data?.artist}</b> 🤖
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
                        title={`Delete ${tag} tag`}
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
                  <h3 className="text-2xl">Click the "Generate" button to generate your tags. 🤖</h3>
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
              <CharacterLimit count={countTagsLength(tags.join(","))} limit={500} />
              <div className="flex items-center ml-auto">
                <div className="mr-4">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();

                      if (!tags.length) {
                        if (!artist.length) {
                          toast.error(error.message.provideArtist);
                          artistRef.current?.focus();
                          return;
                        }

                        if (!artist.includes("-") && !artist.includes(",")) {
                          if (!title.length) {
                            toast.error(error.message.provideTitle);
                            titleRef.current?.focus();
                            return;
                          }
                        }

                        toast.error(error.message.generateTagsFirst);
                        return;
                      }
                      const shuffled = [...tags];

                      for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                      }

                      setTags(shuffled);
                      toast.success(success.message.shuffledSuccessfully);
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
                      toast.error(error.message.generateTagsBeforeYouCopyToClipboard);
                      return;
                    }
                    copy(tags.join(","));
                    toast.success(success.message.tagsCopiedToClipboard);
                  }}
                >
                  Copy generated tags <FiCopy className="ml-2" />
                </Button>
              </div>
            </div>
            {countTagsLength(tags.join(",")) > 500 && (
              <p className="mt-4 text-sm text-red-500">Please delete the least suitable tags for your case.</p>
            )}
            {data?.tagsToBeRemoved.length ? (
              <>
                <div className="border p-4 mt-4 rounded-xl">
                  <h2 className="text-2xl border-b pb-2">Recommended tags to delete 🤖</h2>
                  <div className="flex flex-wrap gap-4 my-4 mt-6">
                    {data?.tagsToBeRemoved.split(",").map((tag) => (
                      <div key={tag} className="flex items-center border p-2 px-4 rounded-xl w-fit">
                        <p className="font-semibold">{tag.toLowerCase()}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <Button
                    style={{ marginLeft: "auto" }}
                    onClick={() => {
                      if (data?.tagsToBeRemoved) {
                        const tagsToRemove = data.tagsToBeRemoved.split(",").map((tag) => tag.trim().toLowerCase());

                        let newTags = tags.filter((tag) => !tagsToRemove.includes(tag.toLowerCase()));

                        setTags(newTags);

                        if (!overflowTagsDeleted) {
                          toast.success(success.message.tagsRemovedSuccessfully);
                        } else {
                          toast.error(error.message.tagsAlreadyRemoved);
                        }

                        setOverflowTagsDeleted(true);
                      }
                    }}
                  >
                    Delete tags <FiDelete className="ml-2" />
                  </Button>
                </div>
              </>
            ) : null}
            {tags.length > 0 && (
              <div className="flex flex-col mt-8 border-t  pt-4">
                <h3 className="text-2xl font-bold">Suggested:</h3>
                <p className="mb-6">Generated titles in different formats you can use.</p>
                {titles.map((title) => (
                  <div className="flex items-center justify-between w-full mt-4" key={title}>
                    <h4 className="text-xl">{title}</h4>
                    <Button
                      onClick={() => {
                        copy(title);
                        toast.success(success.message.copied);
                      }}
                    >
                      Copy <FiCopy className="ml-2" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center w-full pt-4 mt-4">
                  <div className="flex items-center ml-auto">
                    <Button
                      onClick={() => {
                        const uppercaseTitles = titles.map((title) => title.toUpperCase());

                        if (uppercaseTitles === titles) {
                          return;
                        }

                        setTitles(uppercaseTitles);
                      }}
                    >
                      Uppercase <FiEdit className="ml-2" />
                    </Button>
                    <div className="ml-2">
                      <Button
                        onClick={() => {
                          const lowercaseTitles = titles.map((title) => title.toLowerCase());

                          if (lowercaseTitles === titles) {
                            return;
                          }

                          setTitles(lowercaseTitles);
                        }}
                      >
                        Lowercase <FiEdit className="ml-2" />
                      </Button>
                    </div>
                    <div className="ml-2">
                      <Button
                        onClick={() => {
                          if (originalTitles === titles) {
                            return;
                          }
                          setTitles(originalTitles);
                        }}
                      >
                        Original <FiEdit className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tags.length ? (
              <div className="mt-8 flex flex-col border-t pt-4">
                <h3 className="text-2xl font-bold">Seo:</h3>
                <p className="mb-6">Typically added at the end of descriptions.</p>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    {seoText.split("=").map((text) => (
                      <p className="text-xl mb-2">{text}</p>
                    ))}
                  </div>
                </div>
                <div className="ml-auto">
                  <Button
                    onClick={() => {
                      copy(seoText.replaceAll("=", "\n"));
                      toast.success(success.message.copied);
                    }}
                  >
                    Copy <FiCopy className="ml-2" />
                  </Button>
                </div>
              </div>
            ) : null}
            {tags.length > 0 && (
              <div className="mt-8 flex flex-col border-t pt-4">
                <h3 className="text-2xl font-bold">Hashtags:</h3>
                <div className="flex items-center justify-between w-full">
                  <div className="flex">
                    {data?.hashtags.map((hashtag) => (
                      <p key={hashtag} className="text-xl mr-4">
                        #{hashtag}
                      </p>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      const hashtagArray = data?.hashtags.map((hashtag) => `#${hashtag}`);
                      const textToCopy = `${hashtagArray?.join(" ")}`;
                      copy(textToCopy);
                      toast.success(success.message.hashtagsCopiedToClipboard);
                    }}
                  >
                    Copy <FiCopy className="ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        <Footer />
      </MainWrapper>
      <ToastContainer />
    </Container>
  );
}
