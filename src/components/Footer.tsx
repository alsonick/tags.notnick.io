import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bottom-0 left-0 mt-28 text-sm pb-4">
      <h1 className="font-bold text-lg text-gray-800">Lyrics Tags Generator</h1>
      <p className="text-gray-800 text-xs">© {new Date().getFullYear()} | All rights reserved.</p>
      <p className="text-gray-800 text-xs">
        Made with{" "}
        <Link
          className="font-bold hover:underline text-gray-950"
          href="https://nextjs.org/"
          target="_blank"
          title="Next.js"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          className="font-bold hover:underline text-gray-950"
          href="https://tailwindcss.com/"
          target="_blank"
          title="Tailwind"
        >
          Tailwind
        </Link>{" "}
        &{" "}
        <Link
          className="font-bold hover:underline text-gray-950"
          href="https://vercel.com/"
          target="_blank"
          title="Vercel"
        >
          Vercel
        </Link>
        .
      </p>
      <p className="text-gray-800 text-xs">
        Built with ❤️ by{" "}
        <Link
          className="font-bold hover:underline text-gray-950"
          href="https://github.com/alsonick"
          title="Nicholas Njoki"
          target="_blank"
        >
          Nicholas Njoki
        </Link>
        .
      </p>
    </footer>
  );
};
