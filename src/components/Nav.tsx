import { FiExternalLink, FiLink } from "react-icons/fi";
import { NavYouTubeLogo } from "./NavYouTubeLogo";
import { useEffect, useState } from "react";

// Next.js
import Link from "next/link";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`lg:flex items-center fixed justify-between h-20 w-full px-20 bg-white hidden top-0 z-50 transition-shadow duration-500 ${
        scrolled ? "fixed shadow-md h-20" : "fixed shadow-none"
      }`}
    >
      <Link href="/" className="flex items-center">
        <NavYouTubeLogo />
        <div className="flex flex-col text-left gap-0 mb-[3px]">
          <h1 className="font-bold tracking-tighter text-xl ml-3">Lyrics Tags Generator</h1>
        </div>
      </Link>
      <div className="flex items-center">
        <Link
          className="font-semibold hover:underline mr-10 flex items-center"
          href="https://github.com/alsonick/lyrics-tags-generator-docs/issues/new"
          target="_blank"
        >
          Submit Suggestion <FiExternalLink className="ml-1 text-xl" />
        </Link>
        <Link
          className="font-semibold hover:underline flex items-center mr-10"
          href="https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot"
          target="_blank"
        >
          Invite Discord Bot <FiExternalLink className="ml-1 text-xl" />
        </Link>
        <Link
          className="font-semibold hover:underline flex items-center"
          href="https://github.com/alsonick/lyrics-tags-generator-docs"
          target="_blank"
        >
          Documentation <FiExternalLink className="ml-1 text-xl" />
        </Link>
        <Link className="font-semibold hover:underline flex items-center ml-10" href="/privacy-policy">
          Privacy Policy <FiLink className="ml-1 text-xl" />
        </Link>
      </div>
    </nav>
  );
};
