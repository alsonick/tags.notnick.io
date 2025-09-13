import {
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED,
  CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT,
  FEATURES_INPUT_FIELD_CHARACTER_LIMIT,
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT,
  TITLE_INPUT_FIELD_CHARACTER_LIMIT,
} from "@/lib/constants";
import { FiX, FiRepeat, FiTrash, FiDelete, FiEdit, FiSave, FiCornerDownRight } from "react-icons/fi";
import { NoSupportedSizeScreenMessage } from "@/components/NoSupportedSizeScreenMessage";
import { CharacterLimit } from "@/components/CharacterLimit";
import { DevelopmentNav } from "@/components/DevelopmentNav";
import { countTagsLength } from "@/lib/count-tags-length";
import { ToastContainer, toast } from "react-toastify";
import { MainWrapper } from "@/components/MainWrapper";
import { Container } from "@/components/Container";
import { Skeleton } from "@/components/skeleton";
import { Button } from "../components/Button";
import { Switch } from "@/components/switch";
import { Footer } from "@/components/Footer";
import { Response } from "@/types/response";
import { Input } from "@/components/Input";
import { Step } from "../components/Step";
import { useState, useRef } from "react";
import { FiCopy } from "react-icons/fi";
import { success } from "@/lib/success";
import { useRouter } from "next/router";
import { Nav } from "@/components/Nav";
import { Seo } from "@/components/Seo";
import { FORMAT } from "@/lib/format";
import copy from "copy-to-clipboard";
import { error } from "@/lib/error";
import { GENRE } from "@/lib/genre";
import { seo } from "@/lib/seo/seo";

// Next.js
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const [clearAfterResponse, setClearAfterResponse] = useState(
    process.env.NODE_ENV === "development" || router.query.debug === "true" ? false : true
  );
  const [showCustomFormatStringTemplateSection, setShowCustomFormatStringTemplateSection] = useState(false);
  const [showRecommendedTagsToBeDeleteSection, setShowRecommendedTagsToBeDeleteSection] = useState(false);
  const [usedGenerateExampleResponse, setUsedGenerateExampleResponse] = useState(false);
  const [overflowTagsDeleted, setOverflowTagsDeleted] = useState(false);
  const [useAutoDeletedTags, setUseAutoDeletedTags] = useState(false);
  const [originalTitles, setOriginalTitles] = useState<string[]>([]);
  const [autoShuffleTags, setAutoShuffleTags] = useState(false);
  const [displayResponse, setDisplayResponse] = useState(true);
  const [enableLogging, setEnableLogging] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [format, setFormat] = useState("Lyrics");
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState("");
  const [data, setData] = useState<Response>();
  const [channel, setChannel] = useState("");
  const [seoText, setSeoText] = useState("");
  const [genre, setGenre] = useState("None");
  const [artist, setArtist] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [title, setTitle] = useState("");
  const [verse, setVerse] = useState("");

  const refs = {
    features: useRef<HTMLInputElement>(null),
    channel: useRef<HTMLInputElement>(null),
    artist: useRef<HTMLInputElement>(null),
    verse: useRef<HTMLInputElement>(null),
    title: useRef<HTMLInputElement>(null),
  };

  const generate = async (example: boolean) => {
    // Store custom format from localStorage if needed
    let localStorageCustomFormat = "";

    // Reset example state when generating real data
    if (example === false) {
      // Allow example button to be used again
      setUsedGenerateExampleResponse(false);
    } else {
      // Prevent multiple example generations
      if (usedGenerateExampleResponse) {
        // Show error if already generated
        toast.error(error.message.youHaveAlreadyGeneratedTheExampleResponse);
        return;
      }
    }

    // Checks if the artist field was given a custom format key
    if (artist.includes("/custom") && !artist.includes("{")) {
      // Extract the key from the artist string (format: "artist/key/custom")
      const customFormatKey = artist.split("/")[1];
      // Retrieve the saved custom format from localStorage using the key
      const customFormat = localStorage.getItem(customFormatKey);

      // Checks if the value is valid
      if (customFormat === null || !customFormat.length) {
        // Show error and exit if custom format key doesn't exist or is empty
        return alert(error.message.somethingWentWrongRetrievingCustomFormatKey);
      }

      // Store the retrieved custom format for use in API request
      localStorageCustomFormat = customFormat;
    }

    // Starts the loading
    setLoading(true);

    // Build query parameters for the API request
    const queryParams = new URLSearchParams({
      artist: example
        ? "Rex Orange County - Pluto Projector/{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}"
        : localStorageCustomFormat.length
        ? `${artist.trim().split("/")[0]}/${localStorageCustomFormat}`
        : artist.trim(),
      log: process.env.NODE_ENV === "development" || router.query.debug === "true" ? `${enableLogging}` : "true",
      features: features.trim().length ? features.trim() : "none",
      channel: channel.trim().length ? channel.trim() : "none",
      title: title.trim().length ? title.trim() : "none",
      verse: verse.trim().length ? verse.trim() : "none",
      tiktok: tiktok === "true" ? "true" : "false",
      shuffle: autoShuffleTags ? "true" : "false",
      format: format.toLowerCase().trim(),
      genre: genre.toLowerCase().trim(),
      source: "web",
    });

    // Make API request to generate tags with the provided parameters
    const response = await fetch(`/api/generate?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (response.status === 200) {
      // Parse the JSON response data from the API
      const data: Response = await response.json();

      // Check if the response isn't successful
      if (!data.success) {
        toast.error(data.error);
        setLoading(false);
        return;
      }

      // Split the tags by commas and trim them
      let separated: string[];

      // If auto-deleted tags mode is on, use the "removedTags" field
      if (useAutoDeletedTags) {
        // Split the comma-separated string into an array, trimming whitespace
        separated = data.removedTags.split(",").map((tag) => tag.trim());
      } else {
        // Otherwise, use the normal "tags" field
        separated = data.tags.split(",").map((tag) => tag.trim());
      }

      // Success
      toast.success(success.message.tagsGeneratedSuccessfully);
      setSeoText(data.extras.seo.text);
      setTags(separated);
      setLoading(false);
      setData(data);

      // Show tag deletion section if response is too long (over 500 characters)
      if (data.length > 500) {
        setShowRecommendedTagsToBeDeleteSection(true);
      }

      // Show custom format section if the response contains a custom format string
      if (data.customFormat.length > 0) {
        setShowCustomFormatStringTemplateSection(true);
      }
      // Parse and set title suggestions if provided in the response
      if (data.extras.titles) {
        setOriginalTitles(data.extras.titles.split("="));
        setTitles(data.extras.titles.split("="));
      }

      // Reset state
      if (clearAfterResponse) {
        setOverflowTagsDeleted(false);
        setFormat("Lyrics");
        setGenre("None");
        setFeatures("");
        setChannel("");
        setArtist("");
        setTiktok("");
        setVerse("");
        setTitle("");
      }
    }

    // Checks if the response is not "ok"
    if (!response.ok) {
      toast.error(`${response.statusText}.`);
      setLoading(false);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Hide custom format section before generating new tags
    setShowCustomFormatStringTemplateSection(false);

    // Hide recommended tags deletion section before generating new tags
    setShowRecommendedTagsToBeDeleteSection(false);

    // Check if the artist field ends with ",-" which means the title wasn't provided
    if (/,-$/.test(artist)) {
      toast.error(error.message.provideTitle);
      refs.artist.current?.focus();
      return;
    }

    // Check if the artist field starts with ",-" which means the title wasn't provided
    if (/^,-/.test(artist)) {
      toast.error(error.message.invalidFormat);
      refs.artist.current?.focus();
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
        refs.artist.current?.focus();
        return;
      }
    } else {
      if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT) {
        toast.error(error.message.characterLimitExceeded);
        refs.artist.current?.focus();
        return;
      }
    }

    // Checks if the title field reaches the character limit
    if (title.length > TITLE_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error(error.message.characterLimitExceeded);
      refs.title.current?.focus();
      return;
    }

    // Checks if the features field reaches the character limit
    if (features.length > FEATURES_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error(error.message.characterLimitExceeded);
      refs.features.current?.focus();
      return;
    }

    // Checks if the channel name field reaches the character limit.
    if (channel.length > CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT) {
      toast.error(error.message.characterLimitExceeded);
      refs.channel.current?.focus();
      return;
    }

    // Checks if the artist and title is not provided in the artist field.
    if (!/-/.test(artist)) {
      if (!title.length) {
        toast.error(error.message.provideTitle);
        refs.title.current?.focus();
        return;
      }
    }

    // Checks if verse contains any numbers or special characters.
    if (verse.length && !/^[a-zA-Z ,]*$/.test(verse)) {
      toast.error(error.message.removeSpecialCharactersAndNumbersExceptCommasVerse);
      refs.verse.current?.focus();
      return;
    }

    // Checks if verse contains a comma, if does then we split the verses and check if there are more than 3 verses.
    if (verse.length && /,/.test(verse)) {
      const verseSplit = verse.split(",");

      // If there's more than 3 verses then send back a error response
      if (verseSplit.length > 3) {
        toast.error(error.message.threeVersesAreOnlyAllowed);
        refs.verse.current?.focus();
        return;
      }
    }

    // Generates the example response tags
    generate(false);
  };

  const saveCustomFormat = () => {
    // Checks if a custom format was used (Yes, I know this check is useless but I'm just like that lol :3)
    if (!data?.customFormat) {
      return;
    }

    alert(
      "You're currently trying to save a custom format, On the browser we save them in localstorage, please provide a key to identify with the custom format, whenever you want to use the custom format then please append '/[KEY]/' (replace [KEY] with your actual key) at the end of the string in the 'artist' field. Click the 'Ok' Button to proceed."
    );

    // Prompts the user to enter in a valid key
    const key = prompt("Please enter a key you'd like to use:");

    // Validate the user input key
    if (!key?.length || key === null) {
      return alert(error.message.enterValidKey);
    }

    // Set the key and custom format in localStorage
    localStorage.setItem(key, data.customFormat);

    // Notify the user that the custom key was saved
    toast.success(success.message.savedCustomKey);
  };

  const environmentModeSetting =
    process.env.NODE_ENV === "development" ? process.env.NODE_ENV.toUpperCase() : `debug`.toUpperCase();

  return (
    <Container>
      <Seo seoTitle={seo.page.home.title} seoDescription={seo.page.home.description} />
      <NoSupportedSizeScreenMessage />
      <DevelopmentNav />
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
                ref={refs.artist}
                value={artist}
              />
              <p className="text-xs text-gray-800 mt-1">
                Any special characters are allowed except <b>commas</b>.{" "}
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
                required={artist.length && artist.includes("-") ? false : true}
                ref={refs.title}
                value={title}
              />

              <p className="text-xs text-gray-800 mt-1">
                Please remove any <b>commas</b> if there are any.{" "}
                {artist.length && artist.includes("-") ? null : (
                  <span className="text-yellow-600 font-semibold">Required*</span>
                )}
              </p>
              <CharacterLimit limit={TITLE_INPUT_FIELD_CHARACTER_LIMIT} text={title} />
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={3} text="Features" />
              <Input
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Daya"
                ref={refs.features}
                value={features}
                required={false}
              />
              <p className="text-xs text-gray-800 mt-1">
                Please use <b>commas</b> to separate feature artists.
              </p>
              <CharacterLimit limit={FEATURES_INPUT_FIELD_CHARACTER_LIMIT} text={features} />
            </section>
            <section className="flex flex-col w-full">
              <Step step={4} text="Channel" />
              <Input
                onChange={(e) => setChannel(e.target.value)}
                placeholder="Gold Coast Music"
                ref={refs.channel}
                value={channel}
                required={false}
              />
              <p className="text-xs text-gray-800 mt-1">
                Type the name of the <b>YouTube Channel</b>.
              </p>
              <CharacterLimit limit={CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT} text={channel} />
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={5} text="TikTok" />
              <Input onChange={(e) => setTiktok(e.target.value)} placeholder="false" required={false} value={tiktok} />
              <p className="text-xs text-gray-800 mt-1">
                Is the song popular on TikTok? Type <b>"true"</b> if so.{" "}
              </p>
            </section>
            <section className="flex flex-col w-full">
              <Step step={6} text="Format" />
              <div className="relative w-full">
                <select
                  className="appearance-none bg-white border w-full p-2 px-4 pr-10 flex items-center rounded-lg focus:outline-2"
                  onChange={(e) => setFormat(e.target.value)}
                  value={format}
                >
                  <option className="font-inter" value={FORMAT.lyrics}>
                    Lyrics
                  </option>
                  <option className="font-inter" value={FORMAT.bassboosted}>
                    Bass Boosted
                  </option>
                  <option className="font-inter" value={FORMAT.nightcore}>
                    Nightcore/Sped Up
                  </option>
                  <option className="font-inter" value={FORMAT.slowedreverb}>
                    Slowed & Reverb
                  </option>
                  <option className="font-inter" value={FORMAT.letra}>
                    Letra
                  </option>
                  <option className="font-inter" value={FORMAT.testo}>
                    Testo
                  </option>
                  <option className="font-inter" value={FORMAT.phonk}>
                    Phonk
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-gray-600" stroke="currentColor" viewBox="0 0 24 24" fill="none">
                    <path strokeLinejoin="round" strokeLinecap="round" d="M19 9l-7 7-7-7" strokeWidth={2} />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-800 mt-1">
                Select the desired <b>format</b>.
              </p>
            </section>
          </div>
          <div className="flex w-full gap-6 items-center">
            <section className="flex flex-col w-full">
              <Step step={7} text="Genre" />
              <div className="relative w-full">
                <select
                  className="appearance-none bg-white border w-full p-2 px-4 pr-10 flex items-center rounded-lg focus:outline-2"
                  onChange={(e) => setGenre(e.target.value)}
                  value={genre}
                >
                  <option className="font-inter" value={GENRE.none}>
                    None
                  </option>
                  <option className="font-inter" value={GENRE.country}>
                    Country
                  </option>
                  <option className="font-inter" value={GENRE.latin}>
                    Latin
                  </option>
                  <option className="font-inter" value={GENRE.italian}>
                    Italian
                  </option>
                  <option className="font-inter" value={GENRE.phonk}>
                    Phonk
                  </option>
                  <option className="font-inter" value={GENRE.pop}>
                    Pop
                  </option>
                  <option className="font-inter" value={GENRE.rap}>
                    Rap
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-gray-600" stroke="currentColor" viewBox="0 0 24 24" fill="none">
                    <path strokeLinejoin="round" strokeLinecap="round" d="M19 9l-7 7-7-7" strokeWidth={2} />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-800 mt-1">
                Select the desired <b>genre</b>.
              </p>
            </section>
            <section className="flex flex-col w-full">
              <Step step={8} text="Verse" />
              <Input
                onChange={(e) => setVerse(e.target.value)}
                placeholder="dont let me down,said dont let me down"
                required={false}
                ref={refs.verse}
                value={verse}
              />
              <p className="text-xs text-gray-800 mt-1">
                Popular verse? Paste them in here. Limit is <b>3</b>, separate them by <b>commas</b>.
              </p>
            </section>
          </div>
          <div className="w-full justify-between items-center flex flex-col mt-6 border-b pb-4">
            <div className="ml-auto flex justify-between w-full items-center">
              {" "}
              <Button
                title="Generate Example Response"
                type="button"
                onClick={async (e) => {
                  // Prevent the default form submission behavior
                  e.preventDefault();

                  // Mark example button as used
                  setUsedGenerateExampleResponse(true);

                  // Generates the example response tags
                  generate(true);
                }}
              >
                Generate Example Response <FiCornerDownRight className="ml-2 hover:scale-110 duration-150" />
              </Button>
              <div className="flex">
                <div className="mr-2">
                  <Button
                    type="button"
                    title="Clear"
                    onClick={(e) => {
                      // Prevent the default form submission behavior
                      e.preventDefault();

                      // Check if there are any tags to clear
                      if (!tags.length) {
                        // If the tag list is already empty, show an error message and exit
                        toast.error(error.message.nothingToClear);
                        return;
                      }

                      // Hide the recommended tags deletion section
                      setShowRecommendedTagsToBeDeleteSection(false);

                      // Hide the custom format section when clearing
                      setShowCustomFormatStringTemplateSection(false);

                      // Reset example response state to allow the example button to be used again
                      setUsedGenerateExampleResponse(false);

                      // Show success message to user
                      toast.success("Cleared.");

                      // Clear all tags by setting the state to an empty array
                      setTags([]);
                    }}
                  >
                    Clear <FiTrash className="ml-2 hover:scale-110 duration-150" />
                  </Button>
                </div>
                <Button type="submit" title="Generate">
                  Generate <FiCornerDownRight className="ml-2 hover:scale-110 duration-150" />
                </Button>
              </div>
            </div>
            {process.env.NODE_ENV === "development" || router.query.debug === "true" ? (
              <div className="flex flex-col w-full items-center mt-8">
                <div className="flex items-center justify-between w-full">
                  <p>[{environmentModeSetting}] Clear After Response:</p>
                  <Switch
                    onCheckedChange={() => setClearAfterResponse(!clearAfterResponse)}
                    checked={clearAfterResponse}
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <p>[{environmentModeSetting}] Display Response:</p>
                  <Switch checked={displayResponse} onCheckedChange={() => setDisplayResponse(!displayResponse)} />
                </div>
                <div className="flex items-center justify-between w-full">
                  <p>[{environmentModeSetting}] Use Auto Deleted Tags:</p>
                  <Switch
                    checked={useAutoDeletedTags}
                    onCheckedChange={() => setUseAutoDeletedTags(!useAutoDeletedTags)}
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <p>[{environmentModeSetting}] Auto Shuffle Tags:</p>
                  <Switch checked={autoShuffleTags} onCheckedChange={() => setAutoShuffleTags(!autoShuffleTags)} />
                </div>
                <div className="flex items-center justify-between w-full">
                  <p>[{environmentModeSetting}] Enable Logging:</p>
                  <Switch checked={enableLogging} onCheckedChange={() => setEnableLogging(!enableLogging)} />
                </div>
              </div>
            ) : null}
          </div>
        </form>
        {loading ? (
          <div className="mt-6 flex justify-center items-center">
            <div className="border w-full p-4 rounded-lg">
              <div className="flex flex-wrap gap-4 my-4 mt-6">
                {[340, 240, 140, 340, 220, 400, 240, 140, 540, 340, 300, 240, 340, 180, 400].map((width, index) => (
                  <Skeleton key={index} className="h-[42px]" style={{ width }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="border p-4 mt-6 rounded-lg">
              {tags.length > 0 && (
                <h2 className="text-2xl text-left font-medium border-b pb-2">
                  <i>{data?.title}</i> by <b>{data?.artist}</b> 🤖
                </h2>
              )}
              <div className="flex flex-wrap gap-4 my-4 mt-6">
                {tags.length ? (
                  <>
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center border p-2 px-4 rounded-lg
                        hover:cursor-pointer w-fit duration-300 hover:shadow-lg"
                        title={`Delete ${tag} tag`}
                        onClick={() => {
                          // Create a new array of tags excluding the one to be removed
                          // `filter` returns a new array containing only tags that are not equal to `tag`
                          const filtered = tags.filter((t) => t !== tag);

                          // Update the state with the filtered array
                          // This effectively removes the specified tag from the list
                          setTags(filtered);
                        }}
                      >
                        <p className="">{tag}</p>
                        <FiX className="text-lg ml-1 hover:scale-110 duration-150" />
                      </div>
                    ))}
                  </>
                ) : (
                  <h3 className="text-2xl font-light">
                    Click the <b>"Generate"</b> button to generate your tags. 🤖
                  </h3>
                )}
              </div>
            </div>
            {tags.length && displayResponse ? (
              <p className="text-xs ml-auto mt-1 text-gray-400">Response: {data?.responseId}</p>
            ) : null}
            {tags.length > 0 && (
              <div className="flex items-center justify-center w-100 mt-6">
                <Link
                  className="text-sm text-center w-fit underline hover:no-underline text-gray-800"
                  title="Click to view json representation data."
                  href={data?.url ?? ""}
                  target="_blank"
                >
                  Click to view json representation data.
                </Link>
              </div>
            )}
            <div className="flex w-full mt-6 items-center">
              {tags.length ? <CharacterLimit count={countTagsLength(tags.join(","))} limit={500} /> : null}
              {tags.length ? (
                <div className="flex items-center ml-auto">
                  <div className="mr-2">
                    <Button
                      title="Shuffle"
                      type="button"
                      onClick={(e) => {
                        // Prevent the default form submission behavior
                        e.preventDefault();

                        // If no tags exist, run validation checks
                        if (!tags.length) {
                          // If no artist name is provided → show error and focus the artist input
                          if (!artist.length) {
                            toast.error(error.message.provideArtist);
                            refs.artist.current?.focus();
                            return;
                          }

                          // If artist name doesn’t contain "-" or "," (meaning it's a single artist/band name),
                          // then require a title to be provided as well
                          if (!artist.includes("-") && !artist.includes(",")) {
                            if (!title.length) {
                              toast.error(error.message.provideTitle);
                              refs.title.current?.focus();
                              return;
                            }
                          }

                          // If we reach this point, tags are still missing → show generic error
                          toast.error(error.message.generateTagsFirst);
                          return;
                        }

                        // Copy current tags into a new array for shuffling
                        const shuffled = [...tags];

                        // Fisher–Yates shuffle algorithm: randomize array order
                        for (let i = shuffled.length - 1; i > 0; i--) {
                          const j = Math.floor(Math.random() * (i + 1));
                          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                        }

                        // Update state with shuffled tags
                        setTags(shuffled);

                        // Show success message after shuffle
                        toast.success(success.message.shuffledSuccessfully);
                      }}
                    >
                      Shuffle <FiRepeat className="ml-2 hover:scale-110 duration-150" />
                    </Button>
                  </div>
                  <Button
                    style={{ marginLeft: "auto" }}
                    title="Copy generated tags"
                    onClick={() => {
                      // Check if there are any tags to copy
                      if (!tags.length) {
                        // If no tags exist, show an error message and stop execution
                        toast.error(error.message.generateTagsBeforeYouCopyToClipboard);
                        return;
                      }

                      // Join all tags into a single string separated by commas
                      // Example: ["tag1", "tag2"] → "tag1,tag2"
                      copy(tags.join(","));

                      // Show a success toast confirming the tags were copied to the clipboard
                      toast.success(success.message.tagsCopiedToClipboard);
                    }}
                  >
                    Copy generated tags <FiCopy className="ml-2 hover:scale-110 duration-150" />
                  </Button>
                </div>
              ) : null}
            </div>
            {showCustomFormatStringTemplateSection ? (
              <div className="border p-4 mt-4 rounded-lg">
                <h2 className="text-2xl font-medium text-left">Custom 🤖</h2>
                <p className="mt-1 border-b pb-2 text-gray-800">
                  The format string template used to generate your custom tags.
                </p>
                <div className="flex flex-wrap gap-4 my-4 mt-6">
                  <div className="flex items-center border p-2 px-4 rounded-lg w-fit">
                    <p>{data?.customFormat}</p>
                  </div>
                </div>
              </div>
            ) : null}
            {showCustomFormatStringTemplateSection ? (
              <div className="flex w-full mt-6 items-center">
                <div className="flex ml-auto">
                  <div className="mr-2">
                    <Button
                      title="Copy custom format"
                      onClick={() => {
                        // If there is no custom format in the response data
                        if (!data?.customFormat) {
                          // Show an error toast (currently an empty string as the message)
                          toast.error("");
                          return; // Exit early so nothing else runs
                        }

                        // Copy the custom format string to the clipboard
                        copy(data?.customFormat);

                        // Show a success toast confirming the copy action
                        toast.success(success.message.copied);
                      }}
                    >
                      Copy custom format <FiCopy className="ml-2 hover:scale-110 duration-150" />
                    </Button>
                  </div>
                  <Button title="Save custom format" onClick={saveCustomFormat}>
                    Save custom format <FiSave className="ml-2 hover:scale-110 duration-150" />
                  </Button>
                </div>
              </div>
            ) : null}
            {countTagsLength(tags.join(",")) > 500 && (
              <p className="mt-4 text-sm text-red-500">Please delete the least suitable tags for your case.</p>
            )}
            {showRecommendedTagsToBeDeleteSection &&
            data?.tagsToBeRemoved.length &&
            countTagsLength(tags.join(",")) > 500 ? (
              <>
                <div className="border p-4 mt-4 rounded-lg">
                  <h2 className="text-2xl border-b font-medium pb-2">Recommended tags too delete 🤖</h2>
                  <div className="flex flex-wrap gap-4 my-4 mt-6">
                    {data?.tagsToBeRemoved.split(",").map((tag) => (
                      <div key={tag} className="flex items-center border p-2 px-4 rounded-lg w-fit">
                        <p>{tag.toLowerCase()}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <Button
                    style={{ marginLeft: "auto" }}
                    onClick={() => {
                      // Check if the response data contains tags that need to be removed
                      if (data?.tagsToBeRemoved) {
                        // Split the string of tags by comma, trim whitespace, and convert them to lowercase
                        const tagsToRemove = data.tagsToBeRemoved.split(",").map((tag) => tag.trim().toLowerCase());

                        // Create a new list of tags by filtering out the ones that should be removed
                        // Compare in lowercase to ensure case-insensitive matching
                        let newTags = tags.filter((tag) => !tagsToRemove.includes(tag.toLowerCase()));

                        // Update state with the cleaned tag list
                        setTags(newTags);

                        // Show a toast depending on whether overflow tags were previously deleted
                        if (!overflowTagsDeleted) {
                          toast.success(success.message.tagsRemovedSuccessfully); // First removal → success
                        } else {
                          toast.error(error.message.tagsAlreadyRemoved); // Trying to remove again → error
                        }

                        // Mark that we've removed tags once (prevents multiple success toasts)
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
                <h3 className="text-2xl font-medium">Suggested titles:</h3>
                <p className="mb-6 text-gray-800">Titles in different formats you can use.</p>
                {titles.map((title) => (
                  <div className="flex items-center justify-between w-full mt-4" key={title}>
                    <h4 className="text-xl">{title}</h4>
                    <Button
                      type="button"
                      title="Copy"
                      onClick={() => {
                        // Copy the current title string to the clipboard
                        copy(title);

                        // Show a success toast notification confirming the copy action
                        toast.success(success.message.copied);
                      }}
                    >
                      Copy <FiCopy className="ml-2 hover:scale-110 duration-150" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center w-full mt-4">
                  <div className="flex items-center ml-auto">
                    <Button
                      title="Uppercase"
                      type="button"
                      onClick={() => {
                        // Convert all titles in the array to uppercase
                        const uppercaseTitles = titles.map((title) => title.toUpperCase());

                        // Check if the transformed array is the same as the current titles
                        // (Prevents unnecessary re-renders / state updates)
                        if (uppercaseTitles === titles) {
                          return;
                        }

                        // Update state only if there was a change
                        setTitles(uppercaseTitles);
                      }}
                    >
                      Uppercase <FiEdit className="ml-2 hover:scale-110 duration-150" />
                    </Button>
                    <div className="ml-2">
                      <Button
                        title="Lowercase"
                        type="button"
                        onClick={() => {
                          // Create a new array where every title is converted to lowercase
                          const lowercaseTitles = titles.map((title) => title.toLowerCase());

                          // Check if the new array is exactly the same reference as the old one
                          // This will almost always be false, since .map() creates a new array
                          if (lowercaseTitles === titles) {
                            return; // Skip updating if they are the same (but in practice, this won't trigger)
                          }

                          // Update state with the lowercase version of the titles
                          setTitles(lowercaseTitles);
                        }}
                      >
                        Lowercase <FiEdit className="ml-2 hover:scale-110 duration-150" />
                      </Button>
                    </div>
                    <div className="ml-2">
                      <Button
                        title="Original"
                        type="button"
                        onClick={() => {
                          // Check if originalTitles and titles are the same array reference
                          if (originalTitles === titles) {
                            return; // Do nothing if they're the same reference
                          }

                          // Otherwise, update titles state with the originalTitles array
                          setTitles(originalTitles);
                        }}
                      >
                        Original <FiEdit className="ml-2 hover:scale-110 duration-150" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tags.length ? (
              <div className="mt-8 flex flex-col border-t pt-4">
                <h3 className="text-2xl font-medium">Seo keywords:</h3>
                <p className="mb-6 text-gray-800">Typically added at the end of your YouTube description.</p>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    {seoText.split("=").map((text) => (
                      <p className="text-xl mb-2">{text}</p>
                    ))}
                  </div>
                </div>
                <div className="ml-auto">
                  <Button
                    type="button"
                    title="Copy"
                    onClick={() => {
                      // Copy the SEO text to the clipboard
                      // Replace all "=" characters with line breaks ("\n")
                      // so the copied text is formatted nicely
                      copy(seoText.replaceAll("=", "\n"));

                      // Show a success toast to confirm the text was copied
                      toast.success(success.message.copied);
                    }}
                  >
                    Copy <FiCopy className="ml-2 hover:scale-110 duration-150" />
                  </Button>
                </div>
              </div>
            ) : null}
            {tags.length > 0 && (
              <div className="mt-8 flex flex-col border-t pt-4">
                <h3 className="text-2xl font-medium">Hashtags:</h3>
                <div className="flex items-center justify-between w-full">
                  <div className="flex">
                    {data?.hashtags.map((hashtag) => (
                      <p key={hashtag} className="text-xl mr-4">
                        #{hashtag}
                      </p>
                    ))}
                  </div>
                  <Button
                    type="button"
                    title="Copy "
                    onClick={() => {
                      // Take the list of hashtags from the API response (if available)
                      // and prepend "#" to each one
                      const hashtagArray = data?.hashtags.map((hashtag) => `#${hashtag}`);

                      // Join the hashtags into a single string separated by spaces
                      // Example: ["#music", "#lyrics"] → "#music #lyrics"
                      const textToCopy = `${hashtagArray?.join(" ")}`;

                      // Copy the final hashtag string to the clipboard
                      copy(textToCopy);

                      // Show a success toast to let the user know copying worked
                      toast.success(success.message.hashtagsCopiedToClipboard);
                    }}
                  >
                    Copy <FiCopy className="ml-2 hover:scale-110 duration-150" />
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
