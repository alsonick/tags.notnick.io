import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export const BackLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      className="group flex w-fit items-center text-base font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
      title={text}
      href={href}
    >
      <FiArrowLeft className="mr-1.5 text-base transition-transform group-hover:-translate-x-0.5" />
      {text}
    </Link>
  );
};
