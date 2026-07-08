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

## 2026-07-08: Primary Accent Color

### Changed

- The accent color across the site is now green (`#30D158`) instead of blue, so all my services share the same theme color.
- The documentation page uses it too, in the "On this page" highlight, the API Reference badge and the heading anchors.
- Sharing the site on Discord, Twitter/X or elsewhere now produces a slightly nicer card, with proper image alt text and corrected Twitter tags.

### Fixed

- The toggles were nearly invisible in dark mode and had a gray knob when switched on. They now have a visible track and a white knob in both themes.
- The FAQ answers were a size bigger than the rest of the site's text, they now match the site's default text size.
- Removed the two demo videos from the documentation page.

## 2026-07-05: Dark Mode Support

### Added

- Dark mode across the whole site. It follows your system theme by default.
- A theme toggle in the nav that remembers your choice in the browser.
- Toasts, dialogs, dropdowns and form controls switch along with the rest of the site.

### Improved

- The nav's scroll shadow was basically invisible in dark mode, so it now gets a stronger shadow and a thin border there.
- Cleaned up a bunch of text colors that were slightly off from each other, so everything reads the same in both themes.

## 2026-07-03: Introducing Changelog

### Added

- A [changelog page](https://tags.notnick.io/changelog) that lists every entry with its date, commit and content.
- A page for each entry at `/changelog/<slug>`, showing its date, commit, contributors and content, plus a note inviting contributions on GitHub.
- The `changelogs/` directory for markdown-based changelog entries.
- This `CHANGELOG.md` file.
