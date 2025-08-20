import { Analytics } from "@vercel/analytics/next";
import { useEffect, useRef } from "react";
import "@/styles/globals.css";

// Next.js
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Router } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/click.mp3");
    audioRef.current.volume = 0.5;

    const playClick = () => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    };

    Router.events.on("routeChangeStart", playClick);
    return () => {
      Router.events.off("routeChangeStart", playClick);
    };
  }, []);
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
