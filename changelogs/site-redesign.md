---
title: Site Redesign
date: 2026-09-29
description: A refreshed look across the whole site, with cleaner pages, a new footer, better docs and a smoother theme switch.
contributors: Nicholas(https://www.linkedin.com/in/heynickn/)
---

The whole site got a fresh coat of paint. The layout, colors and font are the same as before, it just looks a lot cleaner now, and most pages picked up a few small things that make them nicer to use along the way. Nothing changes in how tags are generated, this one's purely about how the site looks and feels.

## What's new

- A new footer with links to every page, including the format and genre pages which weren't linked from anywhere before, plus GitHub, X and email.
- The genre page now shows the exact tags each genre adds to the generated set.
- Each format page shows its templates as cards, with the tags split out, the `{variables}` highlighted, a copy button, and a switcher to jump between formats.
- The changelog is now a timeline, and each entry links to the one before and after it.
- The documentation has a quick start snippet, shortcut cards to the main sections and a grouped sidebar.
- The FAQ has a "Still have questions?" box at the bottom to send feedback or email me.
- A proper 404 page instead of the default one.

## What's changed

- The generator form sits in a card now, with smaller step numbers, a "Required" badge on the song field and the character count next to each hint.
- Generated tags sit in one card with a bar showing how much of the 500 character budget is used. Hovering a tag turns it red, since clicking it deletes it.
- Suggested titles, SEO keywords and hashtags each get their own card, with the copy buttons up top.
- Every button on the site is the same size now, either black or white with a border.
- The nav is lighter, highlights the page you're on, and dropped the little link icons next to every item.
- The FAQ, privacy policy and the other pages share the same header as the documentation, and the FAQ questions sit in a single card with an icon next to each one.
- Text across the site is a size bigger so it's easier to read.
- The feedback form checks your email as you go, shows errors inside the form instead of a toast, and you can send with ⌘/Ctrl + Enter.
- Toasts have a new look with colored icons and a close button, and they show up in the bottom right so they don't cover the nav.
- The home page title is now "Lyrics Tags Generator - Free YouTube Metadata Generator".

## Improvements

- Switching between light and dark mode fades smoothly instead of snapping.
- Code blocks in the documentation follow the theme instead of always being dark, and they have syntax highlighting now.
- The parameter tables in the documentation are a lot more compact. The format and genre rows list their values side by side instead of one per line.
- Links are a slightly darker green so they're easier to read on a white background.
- The notes in the documentation had green text on a green background, the text is now regular gray so it's easier to read.
- The development tools box remembers its settings between visits, and has a note that ⌘ + D shows or hides it. The green banner at the top in development mode is gone.

## Fixes

- The custom string template section in the documentation said `{b}` is for the title, it's actually `{t}`.
- The privacy policy was missing a space before "Effective Date".
