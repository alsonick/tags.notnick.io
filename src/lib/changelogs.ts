import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';

export interface ChangelogContributor {
  name: string;
  // null (not undefined) when absent so entries stay JSON-serializable for getStaticProps
  url: string | null;
}

export interface ChangelogEntry {
  slug: string;
  title: string;
  date: string;
  description: string;
  contributors: ChangelogContributor[];
  commit: string | null;
  content: string;
}

const CHANGELOGS_DIRECTORY = path.join(process.cwd(), 'changelogs');

// Fallback for entries without a `description` in their frontmatter:
// the first paragraph of the body, stripped of markdown syntax.
const excerptFromContent = (content: string) => {
  const firstParagraph = content.trim().split(/\n\s*\n/)[0] ?? '';
  return firstParagraph
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

// A date prefix (YYYY-MM-DD-) on the filename is allowed but stripped from
// the slug so it doesn't show up in the URL; the date shown on the page
// comes from the frontmatter.
const slugFromFilename = (file: string) => file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

// A contributor is a name with an optional social link in parentheses,
// e.g. `Nicholas(https://www.linkedin.com/in/heynickn/)` or just `Sam`.
const parseContributor = (raw: string): ChangelogContributor | null => {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^(.*?)\s*\((https?:\/\/[^)]+)\)$/);
  if (match) return { name: match[1].trim(), url: match[2] };
  return { name: trimmed, url: null };
};

// Accepts either a YAML list or a comma-separated string, e.g. `contributors: Nicholas, Sam`.
const parseContributors = (contributors: unknown): ChangelogContributor[] => {
  const values = Array.isArray(contributors)
    ? contributors.map(String)
    : typeof contributors === 'string'
    ? contributors.split(',')
    : [];

  return values.map(parseContributor).filter((c): c is ChangelogContributor => c !== null);
};

const parseChangelogFile = (file: string): ChangelogEntry => {
  const raw = fs.readFileSync(path.join(CHANGELOGS_DIRECTORY, file), 'utf-8');
  const { data, content } = matter(raw);
  const slug = slugFromFilename(file);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
    description: data.description ?? excerptFromContent(content),
    contributors: parseContributors(data.contributors),
    commit: data.commit ? String(data.commit).trim() : null,
    content: content.trim(),
  };
};

// Only call these on the server (e.g. inside getStaticProps) — they read from the filesystem.
export const getChangelogEntries = (): ChangelogEntry[] => {
  if (!fs.existsSync(CHANGELOGS_DIRECTORY)) return [];

  return fs
    .readdirSync(CHANGELOGS_DIRECTORY)
    .filter((file) => file.endsWith('.md'))
    .map(parseChangelogFile)
    .sort((a, b) => b.date.localeCompare(a.date));
};

export const getChangelogEntry = (slug: string): ChangelogEntry | null => {
  if (!fs.existsSync(CHANGELOGS_DIRECTORY)) return null;

  const file = fs
    .readdirSync(CHANGELOGS_DIRECTORY)
    .find((f) => f.endsWith('.md') && slugFromFilename(f) === slug);

  return file ? parseChangelogFile(file) : null;
};
