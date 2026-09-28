import {
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED,
  CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT,
  FEATURES_INPUT_FIELD_CHARACTER_LIMIT,
  ARTIST_INPUT_FIELD_CHARACTER_LIMIT,
  TITLE_INPUT_FIELD_CHARACTER_LIMIT,
  VERSE_INPUT_FIELD_CHARACTER_LIMIT,
} from '@/lib/constants';
import {
  FiAlertTriangle,
  FiCornerDownRight,
  FiRepeat,
  FiDelete,
  FiTrash,
  FiCode,
  FiSave,
  FiTool,
  FiTag,
  FiZap,
} from 'react-icons/fi';
import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { SuggestedTitlesSection } from '@/components/sections/SuggestedTitlesSection';
import { SeoKeywordsSection } from '@/components/sections/SeoKeywordsSection';
import { HashtagsSection } from '@/components/sections/HashtagsSection';
import { ResultSection } from '@/components/sections/ResultSection';
import { CharacterLimit } from '@/components/CharacterLimit';
import { countTagsLength } from '@/lib/count-tags-length';
import { Skeleton } from '@/components/shadcn/skeleton';
import { DocumentationNote } from '@/components/documentation/ui/DocumentationNote';
import { MainWrapper } from '@/components/MainWrapper';
import { useState, useRef, useEffect } from 'react';
import { Switch } from '@/components/shadcn/switch';
import { Container } from '@/components/Container';
import { Button } from '../components/Button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Custom } from '@/components/Custom';
import { Response } from '@/types/response';
import { Select } from '@/components/Select';
import { Input } from '@/components/Input';
import { Step } from '../components/Step';
import { FiCopy } from 'react-icons/fi';
import { success } from '@/lib/success';
import { useRouter } from 'next/router';
import { Nav } from '@/components/Nav';
import { Seo } from '@/components/Seo';
import { Tag } from '@/components/Tag';
import { FORMAT } from '@/lib/format';
import copy from 'copy-to-clipboard';
import { error } from '@/lib/error';
import { GENRE } from '@/lib/genre';
import { seo } from '@/lib/seo/seo';
import { toast } from 'sonner';
import Link from 'next/link';

// localStorage key for the developer tool options shown in development and ?debug=true mode.
const DEV_TOOLS_STORAGE_KEY = 'dev-tools-settings';

// Key caps used in the developer tools shortcut hint.
const kbdClassName =
  'inline-block rounded-md border bg-white px-1.5 font-sans text-base font-medium leading-6 text-gray-700 shadow-sm dark:bg-neutral-900 dark:text-gray-300';

// Helper text shown under each form field.
const helperClassName =
  'text-xs text-gray-500 dark:text-gray-400 [&_b]:font-semibold [&_b]:text-gray-700 dark:[&_b]:text-gray-300';

export default function Home() {
  const [showCustomFormatStringTemplateSection, setShowCustomFormatStringTemplateSection] = useState(false);
  const [showRecommendedTagsToBeDeleteSection, setShowRecommendedTagsToBeDeleteSection] = useState(false);
  const [usedGenerateExampleResponse, setUsedGenerateExampleResponse] = useState(false);
  const [overflowTagsDeleted, setOverflowTagsDeleted] = useState(false);
  const [useAutoDeletedTags, setUseAutoDeletedTags] = useState(false);
  const [clearAfterResponse, setClearAfterResponse] = useState(true);
  const [originalTitles, setOriginalTitles] = useState<string[]>([]);
  const [autoShuffleTags, setAutoShuffleTags] = useState(false);
  const [displayResponse, setDisplayResponse] = useState(true);
  const [devViewEnabled, setDevViewEnabled] = useState(true);
  const [enableLogging, setEnableLogging] = useState(true);
  const [showJSONView, setShowJSONView] = useState(true);
  const [titles, setTitles] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [format, setFormat] = useState('Lyrics');
  const [loading, setLoading] = useState(false);
  const [tiktok, setTiktok] = useState('false');
  const [features, setFeatures] = useState('');
  const [data, setData] = useState<Response>();
  const [channel, setChannel] = useState('');
  const [seoText, setSeoText] = useState('');
  const [genre, setGenre] = useState('None');
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [verse, setVerse] = useState('');

  // References to input fields for focusing and validation
  const refs = {
    features: useRef<HTMLInputElement>(null), // Features input field
    channel: useRef<HTMLInputElement>(null), // Channel input field
    artist: useRef<HTMLInputElement>(null), // Artist input field
    verse: useRef<HTMLInputElement>(null), // Verse input field
    title: useRef<HTMLInputElement>(null), // Title input field
  };

  // Initialize router
  const router = useRouter();

  const generate = async (example: boolean) => {
    // Store custom format from localStorage if needed
    let localStorageCustomFormat = '';

    // Check if the /context flag was provided
    let contextEnabled = false;
    let artistInput = artist;

    if (artistInput.includes('\\context')) {
      contextEnabled = true;
      artistInput = artistInput.replace('\\context', '').trim();
    }

    // Reset example state when generating real data
    if (example === false) {
      // Allow example button to be used again
      setUsedGenerateExampleResponse(false);
    } else {
      // Prevent multiple example generations
      if (usedGenerateExampleResponse) {
        // Show error toast when the example response has already been generated
        toast.error(error.message.youHaveAlreadyGeneratedTheExampleResponse);

        // Stop further execution
        return;
      }
    }

    // Checks if the artist field was given a custom format key
    if (artistInput.includes('/custom') && !artistInput.includes('{')) {
      // Extract the key from the artist string (format: "artist/key/custom")
      const customFormatKey = artistInput.split('/')[1];
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
        ? 'The Chainsmokers, Daya - Dont Let Me Down'
        : localStorageCustomFormat.length
          ? `${artistInput.trim().split('/')[0]}/${localStorageCustomFormat}`
          : artistInput.trim(),
      log: process.env.NODE_ENV === 'development' || router.query.debug === 'true' ? `${enableLogging}` : 'true',
      features: features.trim().length ? features.trim() : 'none',
      channel: example ? 'Gold Coast Music' : channel.trim().length ? channel.trim() : 'none',
      title: title.trim().length ? title.trim() : 'none',
      verse: verse.trim().length ? verse.trim() : 'none',
      context: contextEnabled ? 'true' : 'false',
      tiktok: tiktok === 'true' ? 'true' : 'false',
      shuffle: autoShuffleTags ? 'true' : 'false',
      example: example ? 'true' : 'false',
      format: format.toLowerCase().trim(),
      genre: genre.toLowerCase().trim(),
      source: 'web',
    });

    // Make API request to generate tags with the provided parameters
    const response = await fetch(`/api/v1/generate?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (response.status === 200) {
      // Parse the JSON response data from the API
      const data: Response = await response.json();

      // Check if the response isn't successful
      if (!data.success) {
        // Show error toast with the error message from the response
        toast.error(data.error);

        // Stop loading state
        setLoading(false);

        // Stop further execution
        return;
      }

      // Split the tags by commas and trim them
      let separated: string[];

      // If auto-deleted tags mode is on, use the "removedTags" field
      if (useAutoDeletedTags) {
        // Split the comma-separated string into an array, trimming whitespace
        separated = data.removedTags.split(',').map((tag) => tag.trim());
      } else {
        // Otherwise, use the normal "tags" field
        separated = data.tags.split(',').map((tag) => tag.trim());
      }

      // Success
      toast.success(success.message.tagsGeneratedSuccessfully);
      setSeoText(data.extras.seo.text);
      setTags(separated);
      setLoading(false);
      setData(data);

      // Show tag deletion section if response is too long (over 500 characters)
      if (data.length > 500) {
        // Show the section for recommended tags that can be deleted
        setShowRecommendedTagsToBeDeleteSection(true);
      }

      // Show custom format section if the response contains a custom format string
      if (data.customFormat.length > 0) {
        // Show the custom format string template section in the UI
        setShowCustomFormatStringTemplateSection(true);
      }
      // Parse and set title suggestions if provided in the response
      if (data.extras.titles) {
        // Split the titles string by '=' using regex
        setOriginalTitles(data.extras.titles.split(/=/));

        // Split the titles string by '=' using regex (for editing or display)
        setTitles(data.extras.titles.split(/=/));
      }

      // Reset state
      if (clearAfterResponse) {
        setOverflowTagsDeleted(false);
        setFormat('Lyrics');
        setTiktok('false');
        setGenre('None');
        setFeatures('');
        setChannel('');
        setArtist('');
        setVerse('');
        setTitle('');
      }
    }

    // Checks if the response is not "ok"
    if (!response.ok) {
      // Show error toast with the response status text
      toast.error(`${response.statusText}.`);

      // Stop loading state
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
      // Show error toast when title is missing
      toast.error(error.message.provideTitle);

      // Move cursor to the artist input field
      refs.artist.current?.focus();

      // Stop further execution
      return;
    }

    // Check if the artist field starts with ",-" which means the title wasn't provided
    if (/^,-/.test(artist)) {
      // Show error toast when the artist input format is invalid
      toast.error(error.message.invalidFormat);

      // Move cursor to the artist input field
      refs.artist.current?.focus();

      // Stop further execution
      return;
    }

    // Check if there are any commas in the title
    if (/,/.test(title)) {
      // Show error toast when title contains commas
      toast.error(error.message.removeCommasFromTitle);

      // Stop further execution
      return;
    }

    // Checks if the artist field reaches the character limit
    if (/[-,&]/.test(artist)) {
      // Check if artist input exceeds formatted character limit
      if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED) {
        // Show error toast when character limit is exceeded
        toast.error(error.message.characterLimitExceeded);

        // Move cursor to the artist input field
        refs.artist.current?.focus();

        // Stop further execution
        return;
      }
    } else {
      // Check if artist input exceeds character limit
      if (artist.length > ARTIST_INPUT_FIELD_CHARACTER_LIMIT) {
        // Show error toast when character limit is exceeded
        toast.error(error.message.characterLimitExceeded);

        // Move cursor to the artist input field
        refs.artist.current?.focus();

        // Stop further execution
        return;
      }
    }

    // Checks if the title field reaches the character limit
    if (title.length > TITLE_INPUT_FIELD_CHARACTER_LIMIT) {
      // Show error toast when character limit is exceeded
      toast.error(error.message.characterLimitExceeded);

      // Move cursor to the title input field
      refs.title.current?.focus();

      // Stop further execution
      return;
    }

    // Checks if the features field reaches the character limit
    if (features.length > FEATURES_INPUT_FIELD_CHARACTER_LIMIT) {
      // Show error toast when character limit is exceeded
      toast.error(error.message.characterLimitExceeded);

      // Move cursor to the features input field
      refs.features.current?.focus();

      // Stop further execution
      return;
    }

    // Checks if the channel name field reaches the character limit.
    if (channel.length > CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT) {
      // Show error toast when character limit is exceeded
      toast.error(error.message.characterLimitExceeded);

      // Move cursor to the channel input field
      refs.channel.current?.focus();

      // Stop further execution
      return;
    }

    // Checks if the artist and title is not provided in the artist field.
    if (!/-/.test(artist)) {
      if (!title.length) {
        // Show error toast for missing title
        toast.error(error.message.provideTitle);

        // Move cursor to the title input field
        refs.title.current?.focus();

        // Stop further execution
        return;
      }
    }

    // Checks if verse contains any numbers or special characters.
    if (verse.length && !/^[a-zA-Z ,]*$/.test(verse)) {
      // Show error toast for invalid characters in the verse
      toast.error(error.message.removeSpecialCharactersAndNumbersExceptCommasVerse);

      // Move cursor to the verse input field
      refs.verse.current?.focus();

      // Stop further execution
      return;
    }

    // Checks if verse contains a comma, if does then we split the verses and check if there are more than 3 verses.
    if (verse.length && /,/.test(verse)) {
      const verseSplit = verse.split(',');

      // If there's more than 3 verses then send back a error response
      if (verseSplit.length > 3) {
        // Show error toast when more than three verses are added
        toast.error(error.message.threeVersesAreOnlyAllowed);

        // Move cursor to the verse input field
        refs.verse.current?.focus();

        // Stop further execution
        return;
      }
    }

    // Checks if any individual verse reaches the character limit.
    if (verse.length && verse.split(',').some((v) => v.trim().length > VERSE_INPUT_FIELD_CHARACTER_LIMIT)) {
      // Show error toast when an individual verse exceeds the character limit
      toast.error(error.message.characterLimitExceeded);

      // Move cursor to the verse input field
      refs.verse.current?.focus();

      // Stop further execution
      return;
    }

    // Generates the example response tags
    generate(false);
  };

  const saveCustomFormat = () => {
    // Checks if a custom format was used (Yes, I know this check is useless but I'm just like that lol :3)
    if (!data?.customFormat) {
      // Stop further execution
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
    process.env.NODE_ENV === 'development' ? process.env.NODE_ENV.toUpperCase() : `debug`.toUpperCase();

  useEffect(() => {
    // Checks if the app is running in development mode
    if (process.env.NODE_ENV === 'development' || router.query.debug === 'true') {
      // Don’t auto-clear after response when debugging
      // setClearAfterResponse(false);

      // Show the JSON view for easier debugging
      setShowJSONView(true);
    } else {
      // Explicitly hide in production
      setShowJSONView(false);
    }
  }, []); // Empty dependency array → run only once on mount

  const isDevOrDebug = process.env.NODE_ENV === 'development' || router.query.debug === 'true';
  const [devToolSettingsRestored, setDevToolSettingsRestored] = useState(false);

  // Setters for the developer tool options that are remembered between visits.
  const devToolSetters: Record<string, (value: boolean) => void> = {
    clearAfterResponse: setClearAfterResponse,
    useAutoDeletedTags: setUseAutoDeletedTags,
    autoShuffleTags: setAutoShuffleTags,
    enableLogging: setEnableLogging,
    devViewEnabled: setDevViewEnabled,
    showJSONView: setShowJSONView,
    displayResponse: setDisplayResponse,
  };

  useEffect(() => {
    // Restore the saved developer tool options once the router knows about ?debug=true
    if (!router.isReady || !isDevOrDebug || devToolSettingsRestored) return;

    try {
      const saved = JSON.parse(localStorage.getItem(DEV_TOOLS_STORAGE_KEY) ?? '{}');
      Object.entries(devToolSetters).forEach(([key, set]) => {
        if (typeof saved[key] === 'boolean') set(saved[key]);
      });
    } catch {
      // Storage can be unavailable (e.g. private mode); fall back to the defaults.
    }

    setDevToolSettingsRestored(true);
  }, [router.isReady, isDevOrDebug]);

  useEffect(() => {
    // Save the developer tool options whenever one changes, but only after they've been restored
    if (!devToolSettingsRestored || !isDevOrDebug) return;

    try {
      localStorage.setItem(
        DEV_TOOLS_STORAGE_KEY,
        JSON.stringify({
          clearAfterResponse,
          useAutoDeletedTags,
          autoShuffleTags,
          enableLogging,
          devViewEnabled,
          showJSONView,
          displayResponse,
        })
      );
    } catch {
      // Ignore storage errors; the options just won't be remembered.
    }
  }, [
    devToolSettingsRestored,
    clearAfterResponse,
    useAutoDeletedTags,
    autoShuffleTags,
    enableLogging,
    devViewEnabled,
    showJSONView,
    displayResponse,
  ]);

  useEffect(() => {
    // Toggle development view with Cmd+D
    const isDev = process.env.NODE_ENV === 'development' || router.query.debug === 'true';
    if (!isDev) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault();
        setDevViewEnabled((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router.query.debug]);

  useEffect(() => {
    // Run this effect whenever the tags array changes
    if (tags.length === 0) {
      // If there are no tags, reset example response usage
      setUsedGenerateExampleResponse(false);
    }
  }, [tags]); // Dependency: re-run when tags changes (when they're deleted)

  // Toggle option for debug and development modes
  const toggles = [
    { label: 'Clear After Response', state: clearAfterResponse, setState: setClearAfterResponse },
    { label: 'Use Auto Deleted Tags', state: useAutoDeletedTags, setState: setUseAutoDeletedTags },
    { label: 'Auto Shuffle Tags', state: autoShuffleTags, setState: setAutoShuffleTags },
    { label: 'Enable Logging', state: enableLogging, setState: setEnableLogging },
    { label: 'Show Development Tools', state: devViewEnabled, setState: setDevViewEnabled },
    { label: 'Show JSON View', state: showJSONView, setState: setShowJSONView },
    { label: 'Display Response', state: displayResponse, setState: setDisplayResponse },
  ];

  return (
    <Container>
      <Seo
        seoTitle={seo.page.home.title}
        seoDescription={seo.page.home.description}
        path="/"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Lyrics Tags Generator',
            url: 'https://tags.notnick.io/',
            description: seo.page.home.description,
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Lyrics Tags Generator',
            url: 'https://tags.notnick.io/',
          },
        ]}
      />
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <div className="mb-auto">
          <Header />
          <form onSubmit={submit} className="surface flex flex-col mt-10 p-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              <section className="flex flex-col w-full">
                <Step step={1} text="Song" required />
                <Input
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="The Chainsmokers, Daya - Don't Let Me Down"
                  required={true}
                  ref={refs.artist}
                  value={artist}
                />
                <div className="flex items-start justify-between gap-4 mt-1.5">
                  <p className={helperClassName}>The full song. Inclusive of artists, features and title.</p>
                  <CharacterLimit
                    limit={
                      artist.includes('-') || artist.includes(',') || artist.includes('&')
                        ? ARTIST_INPUT_FIELD_CHARACTER_LIMIT_FORMATTED
                        : ARTIST_INPUT_FIELD_CHARACTER_LIMIT
                    }
                    text={artist}
                  />
                </div>
              </section>
              <section className="flex flex-col w-full">
                <Step step={2} text="Channel" />
                <Input
                  onChange={(e) => setChannel(e.target.value)}
                  placeholder="Gold Coast Music"
                  ref={refs.channel}
                  value={channel}
                  required={false}
                />
                <div className="flex items-start justify-between gap-4 mt-1.5">
                  <p className={helperClassName}>
                    Type the name of the <b>YouTube Channel</b>.
                  </p>
                  <CharacterLimit limit={CHANNEL_NAME_INPUT_FIELD_CHARACTER_LIMIT} text={channel} />
                </div>
              </section>
              {/* <section className="flex flex-col w-full">
                <Step step={2} text="Title" required={artist.length && artist.includes('-') ? false : true} />
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Don't Let Me Down"
                  required={artist.length && artist.includes('-') ? false : true}
                  ref={refs.title}
                  value={title}
                />
                <div className="flex items-start justify-between gap-4 mt-1.5">
                  <p className={helperClassName}>
                    Please remove any <b>commas</b> if there are any.
                  </p>
                  <CharacterLimit limit={TITLE_INPUT_FIELD_CHARACTER_LIMIT} text={title} />
                </div>
              </section> */}
              {/* <section className="flex flex-col w-full">
                <Step step={3} text="Features" />
                <Input
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Daya"
                  ref={refs.features}
                  value={features}
                  required={false}
                />
                <div className="flex items-start justify-between gap-4 mt-1.5">
                  <p className={helperClassName}>
                    Please use <b>commas</b> to separate feature artists.
                  </p>
                  <CharacterLimit limit={FEATURES_INPUT_FIELD_CHARACTER_LIMIT} text={features} />
                </div>
              </section> */}
              <section className="flex flex-col w-full">
                <Step step={3} text="TikTok" />
                <Select
                  onChange={setTiktok}
                  value={tiktok}
                  options={[
                    { value: 'false', text: 'No' },
                    { value: 'true', text: 'Yes' },
                  ]}
                />
                <p className={`${helperClassName} mt-1.5`}>Is the song popular on TikTok?</p>
              </section>
              <section className="flex flex-col w-full">
                <Step step={4} text="Format" />
                <Select
                  onChange={setFormat}
                  value={format}
                  options={[
                    { value: FORMAT.lyrics, text: 'Lyrics' },
                    { value: FORMAT.bassboosted, text: 'Bass Boosted' },
                    { value: FORMAT.nightcore, text: 'Nightcore/Sped Up' },
                    { value: FORMAT.slowedreverb, text: 'Slowed & Reverb' },
                    { value: FORMAT.letra, text: 'Letra' },
                    { value: FORMAT.testo, text: 'Testo' },
                    { value: FORMAT.phonk, text: 'Phonk' },
                    { value: FORMAT.none, text: 'None' },
                  ]}
                />
                <p className={`${helperClassName} mt-1.5`}>
                  Select the desired <b>format</b>.
                </p>
              </section>
              <section className="flex flex-col w-full">
                <Step step={5} text="Genre" />
                <Select
                  onChange={setGenre}
                  value={genre}
                  options={[
                    { value: GENRE.none, text: 'None' },
                    { value: GENRE.country, text: 'Country' },
                    { value: GENRE.latin, text: 'Latin' },
                    { value: GENRE.italian, text: 'Italian' },
                    { value: GENRE.dance, text: 'Dance' },
                    { value: GENRE.phonk, text: 'Phonk' },
                    { value: GENRE.pop, text: 'Pop' },
                    { value: GENRE.rap, text: 'Rap' },
                    { value: GENRE.alternative, text: 'Alternative' },
                    { value: GENRE.emo, text: 'Emo' },
                    { value: GENRE.rock, text: 'Rock' },
                    { value: GENRE.edm, text: 'EDM' },
                    { value: GENRE.trap, text: 'Trap' },
                    { value: GENRE.electronic, text: 'Electronic' },
                  ]}
                />
                <p className={`${helperClassName} mt-1.5`}>
                  Select the desired <b>genre</b>.
                </p>
              </section>
              <section className="flex flex-col w-full">
                <Step step={6} text="Verse" />
                <Input
                  onChange={(e) => setVerse(e.target.value)}
                  placeholder="dont let me down,said dont let me down"
                  required={false}
                  ref={refs.verse}
                  value={verse}
                />
                <p className={`${helperClassName} mt-1.5`}>
                  Popular verse? Paste them in here. Limit is <b>3</b>, separate them by <b>commas</b>.
                </p>
              </section>
            </div>
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <Button
                title="Generate example response"
                type="button"
                variant="secondary"
                onClick={async (e) => {
                  // Prevent the default form submission behavior
                  e.preventDefault();

                  // Mark example button as used
                  setUsedGenerateExampleResponse(true);

                  // Generates the example response tags
                  generate(true);
                }}
              >
                <FiZap /> Generate Example Response
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  title="Clear"
                  variant="secondary"
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
                    toast.success(success.message.tagsClearedSuccessfully);

                    // Clear all tags by setting the state to an empty array
                    setTags([]);
                  }}
                >
                  Clear <FiTrash />
                </Button>
                <Button type="submit" title="Generate">
                  Generate <FiCornerDownRight />
                </Button>
              </div>
            </div>
          </form>
          {(process.env.NODE_ENV === 'development' || router.query.debug === 'true') && devViewEnabled ? (
            <div className="mt-6 rounded-xl border border-dashed p-5">
              <div className="flex items-center gap-2">
                <FiTool className="text-gray-500 dark:text-gray-400" />
                <p className="text-base font-semibold text-black dark:text-white">Developer tools</p>
                <span className="rounded-full bg-brand-100 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-brand-800 dark:bg-brand-500/15 dark:text-brand-400">
                  {environmentModeSetting}
                </span>
              </div>
              <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                A set of tools provided if you're in {environmentModeSetting} mode to give you more functionality.
              </p>
              <div className="mt-4">
                <DocumentationNote>
                  Press <kbd className={kbdClassName}>⌘</kbd> + <kbd className={kbdClassName}>D</kbd> at any time to
                  show or hide the development tools.
                </DocumentationNote>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-3 mt-4">
                {toggles.map(({ label, state, setState }) => (
                  <div key={label} className="flex items-center justify-between text-base text-gray-700 dark:text-gray-300">
                    <p>{label}</p>
                    <Switch checked={state} onCheckedChange={() => setState(!state)} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {loading ? (
            <div className="surface mt-6 overflow-hidden">
              <div className="border-b px-5 py-4">
                <Skeleton className="h-7 w-80" />
              </div>
              <div className="flex flex-wrap gap-2 p-5">
                {[260, 190, 120, 260, 170, 300, 190, 110, 380, 250, 230, 180, 260, 140, 300].map((width, index) => (
                  <Skeleton key={index} className="h-9" style={{ width }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {tags.length > 0 ? (
                <div className="surface mt-6 overflow-hidden">
                  <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
                    <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                      <i className="text-black dark:text-white">{data?.title}</i> by{' '}
                      <b className="text-black dark:text-white">{data?.artist}</b>
                    </h2>
                    <Link
                      className="flex shrink-0 items-center gap-1.5 text-base font-medium text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                      title="Click to view json representation data."
                      href={data?.url ?? ''}
                      target="_blank"
                    >
                      <FiCode /> View JSON
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2 p-5">
                    {tags.map((tag, index) => (
                      <Tag key={`${index}-${tag}`} deletable={true} setTags={setTags} tags={tags} tag={tag} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t bg-gray-50/70 px-5 py-3 dark:bg-neutral-900/50">
                    <CharacterLimit bar count={countTagsLength(tags.join(','))} limit={500} />
                    <div className="flex items-center gap-2">
                      <Button
                        title="Shuffle"
                        type="button"
                        variant="secondary"
                        onClick={(e) => {
                          // Prevent the default form submission behavior
                          e.preventDefault();

                          // If no tags exist, run validation checks
                          if (!tags.length) {
                            // If no artist name is provided → show error and focus the artist input
                            if (!artist.length) {
                              // Show error toast for missing artist
                              toast.error(error.message.provideArtist);

                              // Move cursor to the artist input field
                              refs.artist.current?.focus();

                              // Stop further execution
                              return;
                            }

                            // If artist name doesn’t contain "-" or "," (meaning it's a single artist/band name),
                            // then require a title to be provided as well
                            if (!artist.includes('-') && !artist.includes(',')) {
                              // If no title name is provided → show error and focus the title input
                              if (!title.length) {
                                // Show error toast for missing title
                                toast.error(error.message.provideTitle);

                                // Move cursor to the title input field
                                refs.title.current?.focus();

                                // Stop further execution
                                return;
                              }
                            }

                            // If we reach this point, tags are still missing → show generic error
                            toast.error(error.message.generateTagsFirst);

                            // Stop further execution
                            return;
                          }

                          // Copy current tags into a new array for shuffling
                          const shuffled = [...tags];

                          // Fisher–Yates shuffle algorithm: randomize array order
                          for (let i = shuffled.length - 1; i > 0; i--) {
                            // Generate a random index between 0 and i (inclusive)
                            const j = Math.floor(Math.random() * (i + 1));

                            // Swap elements at indices i and j to shuffle the array
                            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                          }

                          // Update state with shuffled tags
                          setTags(shuffled);

                          // Show success message after shuffle
                          toast.success(success.message.shuffledSuccessfully);
                        }}
                      >
                        Shuffle <FiRepeat />
                      </Button>
                      <Button
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
                          copy(tags.join(','));

                          // Show a success toast confirming the tags were copied to the clipboard
                          toast.success(success.message.tagsCopiedToClipboard);
                        }}
                      >
                        Copy generated tags <FiCopy />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed px-6 py-14 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-background shadow-sm">
                    <FiTag className="text-lg text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-black dark:text-white">No tags yet</h3>
                  <p className="mt-1 max-w-md text-base text-gray-500 dark:text-gray-400">
                    Click the <b className="font-semibold text-gray-700 dark:text-gray-300">"Generate"</b> button to
                    generate your metadata. Your tags, suggested titles, SEO keywords and hashtags will show up here.
                  </p>
                </div>
              )}
              {tags.length && displayResponse && devViewEnabled ? (
                <p className="text-xs ml-auto mt-2 font-mono text-gray-400 dark:text-gray-500">
                  Response: {data?.responseId}
                </p>
              ) : null}
              {tags.length && showJSONView && devViewEnabled ? (
                <div className="mt-4 rounded-xl border bg-gray-50 p-4 dark:bg-neutral-900/50">
                  <p className="whitespace-normal break-all font-mono text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                    {JSON.stringify(data)}
                  </p>
                </div>
              ) : null}
              {showCustomFormatStringTemplateSection && data && tags.length ? (
                <Custom
                  data={data}
                  actions={
                    <>
                      <Button
                        title="Copy custom format"
                        variant="secondary"
                        onClick={() => {
                          // If there is no custom format in the response data
                          if (!data?.customFormat) {
                            // Show an error toast (currently an empty string as the message)
                            toast.error('');
                            return; // Exit early so nothing else runs
                          }

                          // Copy the custom format string to the clipboard
                          copy(data?.customFormat);

                          // Show a success toast confirming the copy action
                          toast.success(success.message.copied);
                        }}
                      >
                        Copy custom format <FiCopy />
                      </Button>
                      <Button title="Save custom format" onClick={saveCustomFormat}>
                        Save custom format <FiSave />
                      </Button>
                    </>
                  }
                />
              ) : null}
              {countTagsLength(tags.join(',')) > 500 && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
                  <FiAlertTriangle className="shrink-0" />
                  Please delete the least suitable tags for your case.
                </div>
              )}
              {showRecommendedTagsToBeDeleteSection &&
              data?.tagsToBeRemoved.length &&
              countTagsLength(tags.join(',')) > 500 ? (
                <ResultSection
                  title="Recommended tags to delete"
                  actions={
                    <Button
                      onClick={() => {
                        // Check if the response data contains tags that need to be removed
                        if (data?.tagsToBeRemoved) {
                          // Split the string of tags by comma, trim whitespace, and convert them to lowercase
                          const tagsToRemove = data.tagsToBeRemoved.split(',').map((tag) => tag.trim().toLowerCase());

                          // Create a new list of tags by filtering out the ones that should be removed
                          // Compare in lowercase to ensure case-insensitive matching
                          let newTags = tags.filter((tag) => !tagsToRemove.includes(tag.toLowerCase()));

                          // Update state with the cleaned tag list
                          setTags(newTags);

                          // Show a toast depending on whether overflow tags were previously deleted
                          if (!overflowTagsDeleted) {
                            // First removal → success
                            toast.success(success.message.tagsRemovedSuccessfully);
                          } else {
                            // Trying to remove again → error
                            toast.error(error.message.tagsAlreadyRemoved);
                          }

                          // Mark that we've removed tags once (prevents multiple success toasts)
                          setOverflowTagsDeleted(true);
                        }
                      }}
                    >
                      Delete tags <FiDelete />
                    </Button>
                  }
                >
                  <div className="flex flex-wrap gap-2">
                    {data?.tagsToBeRemoved.split(',').map((tag, index) => (
                      <Tag key={`${index}-${tag}`} deletable={false} tag={tag} />
                    ))}
                  </div>
                </ResultSection>
              ) : null}
              {tags.length ? (
                <SuggestedTitlesSection setTitles={setTitles} originalTitles={originalTitles} titles={titles} />
              ) : null}
              {tags.length ? <SeoKeywordsSection seoText={seoText} /> : null}
              {tags.length ? <HashtagsSection hashtags={data ? data.hashtags : []} /> : null}
            </div>
          )}
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
