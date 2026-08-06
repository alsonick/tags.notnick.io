---
title: Remove low ranking tags
date: 2026-08-06
description: Tags that vidIQ scored as low ranking are no longer generated.
contributors: Nicholas(https://www.linkedin.com/in/heynickn/)
---

A handful of the generated tags were coming back as low ranking on vidIQ, so they're no longer generated. They all shared the same shape, the format word wedged between the artist and the title, so you'd get something like "drake lyrics god's plan". Dropping them also frees up part of the 500 character budget for tags that actually rank.

![vidIQ tag scores for Chris Brown and Justin Bieber's "Next to You", with "chris brown lyrics next to you" and "lyrics justin bieber next to you" both scoring 0](/changelogs/remove-low-ranking-tags/image.png)

## What's changed

- The lyrics format no longer generates `{artist} lyrics {title}` or `lyrics {firstFeature} {title}`.
- Letra and testo had the same shape in both directions, so `{artist} letra {title}`, `{title} letra {artist}` and `letra {title} {artist}` are gone, along with the three testo equivalents.
- Bass boosted drops `{title} bass boosted {artist}`, and nightcore/sped up drops `{title} sped up {artist}`.
- Slowed & reverb, phonk and none are untouched. They already kept the format word at the end.
- Shorter tags like `lyrics {title}` and `testo {artist}` stay, since those still rank fine.
- The tag templates listed in the documentation have been updated to match.
