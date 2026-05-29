import { Badge } from '@/components/shadcn/badge';
import { Param } from '@/types/documentation/param';
import { FaDiscord } from 'react-icons/fa6';
import { TableContainer } from '../ui/TableContainer';
import { DocumentationNote } from '../ui/DocumentationNote';
import { TdElement } from '../ui/TdElement';
import Image from 'next/image';
import Link from 'next/link';

const DISCORD_BOT_INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot';

const COMMAND_PARAMS: Param[] = [{ name: 'Command' }, { name: 'Description' }];

const COMMANDS = [
  { command: '/feedback', description: 'Send feedback, suggestions, or report an issue to the developer.' },
  { command: '/length', description: 'Check the total character length of a generated tag string.' },
  { command: '/generate', description: 'Generate YouTube metadata for a song.' },
];

export const DiscordBot = () => {
  return (
    <div className="flex flex-col">
      <p className="text-gray-700">
        Prefer to stay in Discord? The Lyrics Tags Generator is also available as a Discord bot, so you and your members
        can generate YouTube metadata with a few slash commands.
      </p>

      <Link
        href={DISCORD_BOT_INVITE_URL}
        target="_blank"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#5865F2] px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#4752c4]"
      >
        <FaDiscord className="text-xl" />
        Add to Discord
      </Link>

      <h3 className="mt-10 text-lg font-bold tracking-tight text-gray-900">Installing the bot</h3>
      <p className="mt-2 text-gray-700">
        You'll need the <b>Manage Server</b> permission on the server you want to add the bot to.
      </p>
      <ol className="mt-4 ml-6 list-decimal space-y-2 text-gray-700">
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
        <li>Complete the captcha if prompted.</li>
        <li>The bot will appear in your server's member list, ready to use.</li>
      </ol>

      <h3 className="mt-10 text-lg font-bold tracking-tight text-gray-900">Using the bot</h3>
      <p className="mt-2 mb-4 text-gray-700">
        In any channel the bot can access, you can run the following slash commands:
      </p>
      <TableContainer params={COMMAND_PARAMS}>
        <tbody>
          {COMMANDS.map(({ command, description }) => (
            <tr key={command} className="transition-colors hover:bg-gray-50/70">
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
          For <Badge variant={'secondary'}>/generate</Badge>, <b>artist</b> is required, while <b>title</b> is not
          required if both the artist and title are provided in the <b>artist</b> field.
        </DocumentationNote>
      </div>

      <figure className="mt-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <Image
            src="/documentation/discord-bot-usage-example.png"
            alt="Running the /generate command with the Lyrics Tags Generator Discord bot, showing the generated tags, hashtags, length, and a downloadable tags.txt file."
            width={1768}
            height={1596}
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-center text-xs text-gray-500">
          Generating tags for a song with the <Badge variant={'secondary'}>/generate</Badge> command.
        </figcaption>
      </figure>

      <figure className="mt-8">
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <Image
            src="/documentation/length-usage-example.png"
            alt="Running the /length command with the Lyrics Tags Generator Discord bot, which replies with the character length of the generated tags."
            width={792}
            height={176}
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-center text-xs text-gray-500">
          Checking the length of tags with the <Badge variant={'secondary'}>/length</Badge> command.
        </figcaption>
      </figure>
    </div>
  );
};
