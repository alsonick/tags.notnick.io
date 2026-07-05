import { Badge } from '@/components/shadcn/badge';
import { Param } from '@/types/documentation/param';
import { FaDiscord } from 'react-icons/fa6';
import { TableContainer } from '../ui/TableContainer';
import { DocumentationNote } from '../ui/DocumentationNote';
import { TdElement } from '../ui/TdElement';
import { DocumentationVideo } from '../ui/DocumentationVideo';
import Link from 'next/link';

const DISCORD_BOT_INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot';

const COMMAND_PARAMS: Param[] = [{ name: 'Command' }, { name: 'Description' }];

const COMMANDS = [
  { command: '/feedback', description: 'Send feedback, suggestions, or report an issue to the developer.' },
  { command: '/generate', description: 'YouTube metadata, only tags and hashtags data is included.' },
  { command: '/length', description: 'Check the total character length of a generated tag string.' },
];

const OPTION_PARAMS: Param[] = [{ name: 'Option' }, { name: 'Required' }, { name: 'Default' }];

type CommandOption = {
  option: string;
  required: boolean;
  default: string;
};

const GENERATE_OPTIONS: CommandOption[] = [
  { option: 'artist', required: true, default: '—' },
  { option: 'format', required: false, default: 'Lyrics' },
  { option: 'genre', required: false, default: 'None' },
  { option: 'title', required: false, default: 'None' },
  { option: 'features', required: false, default: 'None' },
  { option: 'channel', required: false, default: 'None' },
  { option: 'shuffle', required: false, default: 'Yes' },
  { option: 'verse', required: false, default: 'None' },
  { option: 'tiktok', required: false, default: 'No' },
  { option: 'context', required: false, default: 'No' },
];

const LENGTH_OPTIONS: CommandOption[] = [{ option: 'tags', required: true, default: '—' }];

const OptionsTable = ({ options }: { options: CommandOption[] }) => {
  return (
    <TableContainer params={OPTION_PARAMS}>
      <tbody>
        {options.map(({ option, required, default: defaultValue }) => (
          <tr key={option} className="transition-colors hover:bg-gray-50/70 dark:hover:bg-neutral-800/50">
            <TdElement col={0} params={OPTION_PARAMS}>
              <Badge variant={'secondary'}>{option}</Badge>
            </TdElement>
            <TdElement col={1} params={OPTION_PARAMS}>
              {required ? 'Yes' : 'No'}
            </TdElement>
            <TdElement col={2} params={OPTION_PARAMS}>
              {defaultValue}
            </TdElement>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};

export const DiscordBot = () => {
  return (
    <div className="flex flex-col">
      <p className="text-gray-700 dark:text-gray-300">
        Prefer to stay in Discord? The Lyrics Tags Generator is also available as a Discord bot, so you and your members
        can generate YouTube metadata with a few slash commands.
      </p>

      <Link
        href={DISCORD_BOT_INVITE_URL}
        target="_blank"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#5865F2] px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#4752c4]"
      >
        <FaDiscord className="text-xl" />
        Add Lyrics Tags Generator Bot
      </Link>

      <h3 className="mt-10 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">Installing the bot</h3>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        You'll need the <b>Manage Server</b> permission on the server you want to add the bot to.
      </p>
      <ol className="mt-4 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          Open the{' '}
          <Link href={DISCORD_BOT_INVITE_URL} target="_blank" className="font-semibold text-blue-500 hover:underline">
            bot invite link
          </Link>
          .
        </li>
        <li>
          Pick your server from the <b>Add to Server</b> dropdown.
        </li>
        <li>
          Review the requested permissions and click <b>Authorize</b>.
        </li>
        <li>The bot will appear in your server's member list, ready to use.</li>
      </ol>

      <h3 className="mt-10 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">Using the bot</h3>
      <p className="mt-2 mb-4 text-gray-700 dark:text-gray-300">
        In any channel the bot can access, you can run the following slash commands:
      </p>
      <TableContainer params={COMMAND_PARAMS}>
        <tbody>
          {COMMANDS.map(({ command, description }) => (
            <tr key={command} className="transition-colors hover:bg-gray-50/70 dark:hover:bg-neutral-800/50">
              <TdElement col={0} params={COMMAND_PARAMS}>
                <Badge variant={'secondary'}>{command}</Badge>
              </TdElement>
              <TdElement col={1} params={COMMAND_PARAMS}>
                {description}
              </TdElement>
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <div className="mt-2">
        <DocumentationNote>
          For the <Badge variant={'secondary'}>/generate</Badge> endpoint route, the <b>artist</b> component is
          required, the <b>title</b> component is not required if both the <b>artist</b> and <b>title</b> components are
          provided in the <b>artist</b> field.
        </DocumentationNote>
      </div>

      <DocumentationVideo
        className="mt-6"
        src="/documentation/generate.mp4"
        poster="/documentation/generate-poster.jpg"
        label="Running the /generate command with the Lyrics Tags Generator Discord bot, showing the generated tags, hashtags, length, and a downloadable tags.txt file."
        width={1746}
        height={1816}
        caption={
          <>
            Generating tags for a song with the <Badge variant={'secondary'}>/generate</Badge> command.
          </>
        }
      />

      <h3 className="mt-10 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
        <Badge variant={'secondary'}>/generate</Badge> options
      </h3>
      <p className="mt-2 mb-4 text-gray-700 dark:text-gray-300">
        The <Badge variant={'secondary'}>/generate</Badge> command accepts the following options:
      </p>
      <OptionsTable options={GENERATE_OPTIONS} />

      <DocumentationVideo
        className="mt-8"
        src="/documentation/length.mp4"
        poster="/documentation/length-poster.jpg"
        label="Running the /length command with the Lyrics Tags Generator Discord bot, which replies with the character length of the generated tags."
        width={1746}
        height={558}
        caption={
          <>
            Checking the length of tags with the <Badge variant={'secondary'}>/length</Badge> command.
          </>
        }
      />

      <h3 className="mt-10 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
        <Badge variant={'secondary'}>/length</Badge> options
      </h3>
      <p className="mt-2 mb-4 text-gray-700 dark:text-gray-300">
        The <Badge variant={'secondary'}>/length</Badge> command accepts the following options:
      </p>
      <OptionsTable options={LENGTH_OPTIONS} />
    </div>
  );
};
