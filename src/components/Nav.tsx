import { FiArrowUpRight } from 'react-icons/fi';
import { NavYouTubeLogo } from './NavYouTubeLogo';
import { FeedbackModal } from './FeedbackModal';
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
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

export const Nav = () => {
  const router = useRouter();
  const scrolled = useScrolled();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const linkClassName = (active: boolean) =>
    cn(
      'flex items-center rounded-lg px-3 py-1.5 text-base font-medium transition-colors',
      active
        ? 'bg-gray-100 text-black dark:bg-neutral-800 dark:text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-neutral-800/70 dark:hover:text-white'
    );

  return (
    <nav
      className={`xl:flex items-center fixed top-0 justify-between h-16 w-full px-20 bg-background/80 backdrop-blur-md hidden
        z-50 border-b transition-[box-shadow,border-color] duration-500 ${
          scrolled
            ? 'border-gray-200 shadow-sm dark:border-neutral-800 dark:shadow-[0_8px_24px_rgba(0,0,0,0.6)]'
            : 'border-transparent shadow-none'
        }`}
    >
      <Link href="/" className="group flex items-center">
        <NavYouTubeLogo size={25} />
        <span className="font-bold tracking-tighter text-lg ml-2.5">Lyrics Tags Generator</span>
      </Link>
      <div className="flex items-center gap-1">
        {NAV_LINKS.map(({ label, href, external, modal }) =>
          modal ? (
            <button
              className={linkClassName(false)}
              onClick={() => setFeedbackOpen(true)}
              title={label}
              type="button"
              key={label}
            >
              {label}
            </button>
          ) : (
            <Link
              className={linkClassName(!external && router.pathname.startsWith(href))}
              target={external ? '_blank' : undefined}
              title={label}
              key={label}
              href={href}
            >
              {label}
              {external ? <FiArrowUpRight className="ml-0.5 text-base opacity-60" /> : null}
            </Link>
          )
        )}
        <div className="ml-3 h-5 w-px bg-gray-200 dark:bg-neutral-800" />
        <div className="ml-3">
          <ThemeToggle />
        </div>
      </div>

      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </nav>
  );
};
