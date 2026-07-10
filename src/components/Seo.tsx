// Next.js
import Head from 'next/head';

const SITE_URL = 'https://tags.notnick.io';
const SITE_NAME = 'Lyrics Tags Generator';

interface Props {
  seoDescription: string;
  seoTitle: string;
  // Page path starting with '/', e.g. '/faq'. Drives the canonical and og:url.
  path?: string;
  // JSON-LD objects rendered as application/ld+json scripts.
  structuredData?: Record<string, unknown>[];
}

export const Seo = (props: Props) => {
  const imageUrl = `${SITE_URL}/tags.png`;
  const pageUrl = new URL(props.path ?? '/', SITE_URL).toString();

  return (
    <Head>
      <title>{props.seoTitle}</title>
      <meta name="description" content={props.seoDescription} key="desc" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="theme-color" content="#30D158" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="msapplication-TileColor" content="#30D158" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={props.seoTitle} />
      <meta property="og:description" content={props.seoDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content="Lyrics Tags Generator — free YouTube tags for lyric videos" />
      <meta property="og:image:width" content="5600" />
      <meta property="og:image:height" content="3200" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.seoTitle} />
      <meta name="twitter:description" content={props.seoDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="Lyrics Tags Generator — free YouTube tags for lyric videos" />
      <meta name="twitter:site" content="@heynickn" />
      <meta name="twitter:creator" content="@heynickn" />
      <meta name="twitter:domain" content="tags.notnick.io" />
      <meta name="twitter:url" content={pageUrl} />

      {props.structuredData?.map((data, index) => (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          key={`jsonld-${index}`}
        />
      ))}
    </Head>
  );
};
