import { getChangelogEntries } from '@/lib/changelogs';
import { FORMAT_LIST } from '@/lib/format-list';
import { GetServerSideProps } from 'next';

const SITE_URL = 'https://tags.notnick.io';

const STATIC_PATHS = ['/', '/faq', '/format', '/genre', '/documentation', '/changelog', '/privacy-policy'];

interface SitemapUrl {
  path: string;
  lastmod?: string;
}

const buildXml = (urls: SitemapUrl[]) => {
  const entries = urls
    .map((url) => {
      const loc = new URL(url.path, SITE_URL).toString();
      const lastmod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : '';
      return `<url><loc>${loc}</loc>${lastmod}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls: SitemapUrl[] = [
    ...STATIC_PATHS.map((path) => ({ path })),
    ...FORMAT_LIST.map((format) => ({ path: `/format/${format.slug}` })),
    ...getChangelogEntries().map((entry) => ({
      path: `/changelog/${entry.slug}`,
      lastmod: entry.date || undefined,
    })),
  ];

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildXml(urls));
  res.end();

  return { props: {} };
};

// The response is written entirely in getServerSideProps; this component never renders.
export default function Sitemap() {
  return null;
}
