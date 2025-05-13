import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bottom-0 left-0 mt-28 text-sm pb-4">
      <h1 className="font-bold text-lg text-gray-800">Nicholas Njoki</h1>
      <p className="text-gray-600 text-xs">
        © {new Date().getFullYear()} | All rights reserved.
      </p>
      <p className="text-gray-600 text-xs">
        Made with{" "}
        <Link
          className="font-bold hover:underline"
          href="https://nextjs.org/"
          target="_blank"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          className="font-bold hover:underline"
          href="https://tailwindcss.com/"
          target="_blank"
        >
          Tailwind
        </Link>{" "}
        &{" "}
        <Link
          className="font-bold hover:underline"
          href="https://vercel.com/"
          target="_blank"
        >
          Vercel
        </Link>
        .
      </p>
      <p className="text-gray-600 text-xs">
        Built with ❤️ by{" "}
        <Link
          href="https://github.com/alsonick"
          className="font-bold hover:underline"
          target="_blank"
        >
          Nicholas Njoki
        </Link>
        .
      </p>
    </footer>
  );
};
