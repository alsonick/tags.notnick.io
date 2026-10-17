---
title: Niche Additional Genres
date: 2026-10-17
description: Four niche genres are available when generating tags, angelcore, house, wave and hardtekk.
contributors: Nicholas(https://www.linkedin.com/in/heynickn/)
---

Four more genres have been added, this time from the more niche side of things: angelcore, house, wave and hardtekk. They work the same way as the existing genres, picking one adds a few genre tags to the generated set.

## What's new

- Angelcore, house, wave and hardtekk are now options in the genre dropdown.
- The API accepts them too, via the `genre` parameter.
- They're listed on the genre page and in the documentation.
- Angelcore adds `angelcore`, `angelcore 2026`, `angelcore music` and `angelic music`.
- House adds `house`, `house 2026`, `house music` and `deep house`.
- Wave adds `wave`, `wave 2026`, `wave music` and `hard wave`.
- Hardtekk adds `hardtekk`, `hardtekk 2026`, `hardtekk music` and `tekk`.
- The year tag always follows the current year, the same as the other genres.

## Fixes

- The API accepted genres in any casing, like `genre=Rock`, but quietly left out the genre tags unless the genre was all lowercase. Every casing gets the genre tags now. The site always sent lowercase, so this only affected direct API requests.
