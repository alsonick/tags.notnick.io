import { seoKeywords } from '@/lib/seo/seo-keywords';

// Next.js
import Head from 'next/head';

interface Props {
  seoDescription: string;
  seoTitle: string;
}

export const Seo = (props: Props) => {
  const imageUrl = 'https://tags.notnick.io/tags.png';
  const siteUrl = 'https://tags.notnick.io';

  return (
    <Head>
      <title>{props.seoTitle}</title>
      <meta name="description" content={props.seoDescription} key="desc" />
      <meta name="keywords" content={seoKeywords} />
      <meta name="theme-color" content="#30D158" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="msapplication-TileColor" content="#30D158" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={`${props.seoTitle} | YouTube`} />
      <meta property="og:description" content={props.seoDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="tags.notnick.io" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content="tags.notnick.io — YouTube tags generator" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${props.seoTitle} | YouTube`} />
      <meta name="twitter:description" content={props.seoDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="tags.notnick.io — YouTube tags generator" />
      <meta name="twitter:site" content="@heynickn" />
      <meta name="twitter:creator" content="@heynickn" />
      <meta name="twitter:domain" content="tags.notnick.io" />
      <meta name="twitter:url" content={siteUrl} />
    </Head>
  );
};
