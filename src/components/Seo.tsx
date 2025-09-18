import { seoKeywords } from "@/lib/seo/seo-keywords";

// Next.js
import Head from "next/head";

interface Props {
  seoDescription: string;
  seoTitle: string;
}

export const Seo = (props: Props) => {
  const imageUrl = "https://tags.notnick.io/tags.png";
  const siteUrl = "https://tags.notnick.io";

  return (
    <Head>
      <title>{props.seoTitle}</title>
      <meta name="description" content={props.seoDescription} key="desc" />
      <meta property="og:title" content={`${props.seoTitle} | YouTube`} />
      <meta name="theme-color" content="#f54bff" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="twitter:title" content={`${props.seoTitle} | YouTube`} />
      <meta name="twitter:description" content={props.seoDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:image" content={imageUrl} />
      <meta property="twitter:site" content="@nick" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="tags.notnick.io" />
      <meta name="keywords" content={seoKeywords} />
      <meta property="twitter:creator" content="@heynickn" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:description" content={props.seoDescription} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta name="twitter:domain" content="tags.notnick.io" />
      <meta name="twitter:url" content={siteUrl} />
    </Head>
  );
};
