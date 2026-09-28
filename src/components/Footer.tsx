import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import { GITHUB_REPOSITORY_URL } from '@/lib/constants';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';
import { NavYouTubeLogo } from './NavYouTubeLogo';
import { FeedbackModal } from './FeedbackModal';
import { useState } from 'react';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href?: string;
  external?: boolean;
  // Opens the feedback modal instead of navigating.
  modal?: boolean;
}

// Links in each column are ordered by label length, longest first.
const FOOTER_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Changelog', href: '/changelog' },
      { label: 'Generator', href: '/' },
      { label: 'Formats', href: '/format' },
      { label: 'Genres', href: '/genre' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Documentation', href: '/documentation' },
      { label: 'API Endpoints', href: '/documentation#endpoints' },
      { label: 'Discord Bot', href: '/documentation#discord-bot' },
    ],
  },
  {
    heading: 'Support',
    links: [
      {
        label: 'Submit Suggestion',
        href: 'https://github.com/alsonick/lyrics-tags-generator-docs/issues/new',
        external: true,
      },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Feedback', modal: true },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: GITHUB_REPOSITORY_URL, icon: FaGithub },
  { label: 'X (Twitter)', href: 'https://x.com/heynickn', icon: FaXTwitter },
  { label: 'Email', href: 'mailto:hi@notnick.io', icon: FiMail },
];

const columnLinkClassName =
  'group flex w-fit items-center whitespace-nowrap text-base text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white';

export const Footer = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <footer className="mt-20 border-t pt-12 pb-8">
      <div className="flex justify-between gap-12">
        <div className="max-w-xs">
          <Link href="/" className="group flex items-center text-black dark:text-white w-fit">
            <NavYouTubeLogo size={23} />
            <p className="ml-2 font-bold tracking-tighter text-lg">Lyrics Tags Generator</p>
          </Link>

          <div className="mt-5 flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                className="flex h-8 w-8 items-center justify-center rounded-lg border text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                aria-label={label}
                title={label}
                key={label}
                href={href}
              >
                <Icon className="text-[15px]" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-16">
          {FOOTER_COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map(({ label, href, external, modal }) => (
                  <li key={label}>
                    {modal ? (
                      <button className={columnLinkClassName} onClick={() => setFeedbackOpen(true)} type="button">
                        {label}
                      </button>
                    ) : (
                      <Link className={columnLinkClassName} target={external ? '_blank' : undefined} href={href ?? '/'}>
                        {label}
                        {external ? (
                          <FiArrowUpRight className="ml-0.5 text-sm opacity-60 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                        ) : null}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 border-t pt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Nicholas Njoki · MIT License</p>
      </div>

      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </footer>
  );
};
