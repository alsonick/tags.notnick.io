import { FiMoon, FiSun } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';
import { buttonVariants } from './Button';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render the icon after mounting so the server and client markup match.
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Browsers without view transitions (or users who prefer less motion) switch instantly.
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Cross-fade the whole page between themes. flushSync makes React apply the new
    // theme class before the browser captures the "after" snapshot.
    document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  return (
    <button
      className={cn(buttonVariants({ variant: 'secondary' }), 'w-8 px-0 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white')}
      onClick={toggleTheme}
      title="Toggle theme"
      type="button"
    >
      {mounted ? resolvedTheme === 'dark' ? <FiSun className="text-base" /> : <FiMoon className="text-base" /> : null}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
