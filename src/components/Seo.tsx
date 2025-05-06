import Head from "next/head";

interface Props {
  seoTitle: string;
  seoDescription: string;
}

export const Seo = (props: Props) => {
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
      <meta property="og:image" content="/tags.png" />
      <meta name="twitter:image" content="/tags.png" />
      <meta property="twitter:site" content="@nick" />
      <meta property="og:url" content="tags.notnick.io" />
      <meta property="og:site_name" content="tags.notnick.io" />
      <meta property="twitter:creator" content="@heynickn" />
      <meta property="og:type" content="website" />
      <meta name="twitter:image" content="/tags.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:description" content={props.seoDescription} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
    </Head>
  );
};
