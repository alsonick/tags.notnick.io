import { FiExternalLink, FiLink } from 'react-icons/fi';
import { NavYouTubeLogo } from './NavYouTubeLogo';
import { FeedbackModal } from './FeedbackModal';
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useScrolled = (offset: number = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > offset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return scrolled;
};

interface NavLink {
  label: string;
  href: string;
  external: boolean;
  modal?: boolean;
}

const NAV_LINKS: NavLink[] = [
  {
    label: 'Submit Suggestion',
    href: 'https://github.com/alsonick/lyrics-tags-generator-docs/issues/new',
    external: true,
  },
  // {
  //   label: 'Discord Bot',
  //   href: 'https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot',
  //   external: true,
  // },
  {
    label: 'Documentation',
    href: '/documentation',
    external: false,
  },
  {
    label: 'Privacy Policy',
    href: '/privacy-policy',
    external: false,
  },
  {
    label: 'Feedback',
    href: 'https://notnick.io/tools/lyrics-tags-generator/feedback',
    external: false,
    modal: true,
  },
  // {
  //   label: "Format",
  //   href: "/format",
  //   external: false,
  // },
  {
    label: 'Changelog',
    href: '/changelog',
    external: false,
  },
  {
    label: 'FAQ',
    href: '/faq',
    external: false,
  },
];

export const Nav = ({ devViewEnabled = true }: { devViewEnabled?: boolean }) => {
  const router = useRouter();
  const scrolled = useScrolled();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const isDev = (process.env.NODE_ENV === 'development' || router.query.debug === 'true') && devViewEnabled;

  return (
    <nav
      className={`xl:flex items-center fixed justify-between h-20 w-full px-20 bg-background hidden
        ${isDev ? 'top-5' : 'top-0'}
        z-50 border-b border-transparent transition-[box-shadow,border-color] duration-500 ${
          scrolled
            ? 'shadow-md dark:shadow-[0_8px_24px_rgba(0,0,0,0.6)] dark:border-neutral-800'
            : 'shadow-none'
        }`}
    >
      <Link href="/" className="flex items-center">
        <NavYouTubeLogo />
        <div className="flex flex-col text-left gap-0">
          <h1 className="font-bold tracking-tighter text-xl ml-3">Lyrics Tags Generator</h1>
        </div>
      </Link>
      <div className="flex items-center space-x-8">
        {NAV_LINKS.map(({ label, href, external, modal }) =>
          modal ? (
            <button
              className="font-medium hover:underline flex items-center text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white"
              onClick={() => setFeedbackOpen(true)}
              title={label}
              type="button"
              key={label}
            >
              {label}
              <FiLink className="ml-1 text-xl" />
            </button>
          ) : (
            <Link
              className="font-medium hover:underline flex items-center text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white"
              target={external ? '_blank' : undefined}
              title={label}
              key={label}
              href={href}
            >
              {label}
              {external ? <FiExternalLink className="ml-1 text-xl" /> : <FiLink className="ml-1 text-xl" />}
            </Link>
          )
        )}
        <ThemeToggle />
      </div>

      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </nav>
  );
};
