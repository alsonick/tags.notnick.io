import { NoSupportedSizeScreenMessage } from '@/components/NoSupportedSizeScreenMessage';
import { MainWrapper } from '@/components/MainWrapper';
import { Container } from '@/components/Container';
import { buttonVariants } from '@/components/Button';
import { FiArrowLeft, FiBook } from 'react-icons/fi';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container>
      <Head>
        <title>Page Not Found | Lyrics Tags Generator</title>
        <meta name="robots" content="noindex" />
      </Head>
      <NoSupportedSizeScreenMessage />
      <Nav />
      <MainWrapper>
        <div className="relative isolate mb-auto flex flex-col items-center pt-24 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute top-16 left-1/2 -z-10 h-48 w-[32rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-500/[0.07]"
          />
          <p className="rounded-full border bg-background/70 px-3 py-1 font-mono text-xs text-gray-500 shadow-sm dark:text-gray-400">
            404
          </p>
          <h1 className="mt-5 text-5xl font-bold tracking-tighter">404 - Page Not Found</h1>
          <p className="mt-3 max-w-lg text-lg text-gray-600 dark:text-gray-400">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="mt-8 flex items-center gap-2">
            <Link className={buttonVariants({ variant: 'secondary' })} href="/documentation">
              <FiBook /> Documentation
            </Link>
            <Link className={buttonVariants()} href="/">
              <FiArrowLeft /> Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </MainWrapper>
    </Container>
  );
}
