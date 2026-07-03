# Changelog

All notable changes to Lyrics Tags Generator are documented in this file.

Each entry also lives as its own markdown file in the [`changelogs/`](./changelogs) directory, which powers the [changelog page](https://tags.notnick.io/changelog) on the site.

## Writing an entry

An entry is a `short-slug.md` file in [`changelogs/`](./changelogs), where the filename becomes the URL (`/changelog/short-slug`). It starts with frontmatter followed by regular markdown:

```markdown
---
title: Introducing Changelog
date: 2026-07-03
description: The site now has a changelog so you can see what's new.
contributors: Nicholas(https://www.linkedin.com/in/heynickn/)
commit: 7a2c3f2
---
```

- `title` and `date` are shown on the page; entries are sorted by date, newest first.
- `contributors` is a comma-separated list of names. A name can include a social link in parentheses, which makes the name clickable.
- `commit` is the hash of the commit that shipped the change. It's shown as a chip linking to the commit on GitHub.
- `##` headings in the body get an icon based on their text: headings mentioning "fix" or "improve" get a bug icon, "breaking" gets an alert icon, and everything else gets a sparkles icon.

## 2026-07-03: Introducing Changelog

### Added

- A [changelog page](https://tags.notnick.io/changelog) that lists every entry with its date, commit and content.
- A page for each entry at `/changelog/<slug>`, showing its date, commit, contributors and content, plus a note inviting contributions on GitHub.
- The `changelogs/` directory for markdown-based changelog entries.
- This `CHANGELOG.md` file.
