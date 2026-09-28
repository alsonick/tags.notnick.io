export const Header = () => {
  return (
    <header className="relative isolate flex flex-col items-center mt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 left-1/2 -z-10 h-56 w-[40rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-500/[0.07]"
      />
      <h1 className="text-6xl font-bold tracking-tighter justify-center flex items-center bg-gradient-to-b from-black to-neutral-600 bg-clip-text text-transparent pb-3 dark:from-white dark:to-neutral-400">
        Lyrics Tags Generator
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-1 text-lg">Generate YouTube metadata for your lyric videos.</p>
    </header>
  );
};
