import { FiMoon, FiSun } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render the icon after mounting so the server and client markup match.
  useEffect(() => setMounted(true), []);

  return (
    <button
      className="flex items-center justify-center h-9 w-9 rounded-lg border text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      title="Toggle theme"
      type="button"
    >
      {mounted ? resolvedTheme === 'dark' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" /> : null}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
