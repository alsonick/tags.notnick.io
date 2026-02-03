# Lyrics Tags Generator

A YouTube metadata generator service.

[![Website](https://img.shields.io/badge/website-tags.notnick.io-blue)](https://tags.notnick.io)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)](https://nextjs.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC)](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/tags.notnick.io.git
cd tags.notnick.io
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory

```env
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
```

> This step is optional.

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Documentation

### Endpoint

```
GET https://tags.notnick.io/api/v1/generate
```

### Parameters

| Params     | Required | Default | Description                                                                            |
| ---------- | -------- | ------- | -------------------------------------------------------------------------------------- |
| `artist`   | Yes      | none    | Artist name and song title (format: `Artist - Title` or `Artist, Featured - Title`)    |
| `tiktok`   | Yes      | none    | Whether the song is trending on TikTok                                                 |
| `title`    | No       | none    | Song title (if not included in artist field)                                           |
| `format`   | No       | none    | Video format (bassboosted, nightcore, slowedreverb, letra, testo, phonk, lyrics, none) |
| `genre`    | No       | none    | Music genre (rap, hiphop, country, pop, funk, phonk, latin, italian, dance, none)      |
| `features` | No       | none    | Featured artists (comma-separated)                                                     |
| `channel`  | No       | none    | YouTube channel name                                                                   |
| `verse`    | No       | none    | Popular verses (comma-separated, max 3)                                                |
| `shuffle`  | No       | false   | Shuffle tag order                                                                      |
| `log`      | No       | true    | Log to Discord webhook                                                                 |
| `source`   | No       | unknown | Request source                                                                         |
| `example`  | No       | false   | Example mode                                                                           |
| `webhook`  | No       | none    | Custom Discord webhook URL                                                             |

### Custom Format Variables

Use custom tag patterns by appending `/{pattern}` to the artist field:

| Variables | Required | Description            |
| --------- | -------- | ---------------------- |
| `{a}`     | artist   | Main artist name       |
| `{t}`     | artist   | Song title             |
| `{f1}`    | artist   | First featured artist  |
| `{f2}`    | artist   | Second featured artist |
| `{f3}`    | artist   | Third featured artist  |

This generates tags in the pattern: `Future,Drake,Tems,Young Thug,Wait For U`

### JSON representation data

```json
{
  "success": true,
  "tags": "rex orange county pluto projector,rex orange county pluto projector lyrics,pluto projector lyrics,pluto projector rex orange county lyrics,lyrics pluto projector,rex orange county lyrics pluto projector,rex orange county lyrics,lyrics rex orange county,pluto projector,rex orange county,pluto projector rex orange county,lyrics pluto projector rex orange county,lyrics rex orange county pluto projector,lyrics",
  "tagsToBeRemoved": "",
  "removedTags": "rex orange county pluto projector,rex orange county pluto projector lyrics,pluto projector lyrics,pluto projector rex orange county lyrics,lyrics pluto projector,rex orange county lyrics pluto projector,rex orange county lyrics,lyrics rex orange county,pluto projector,rex orange county,pluto projector rex orange county,lyrics pluto projector rex orange county,lyrics rex orange county pluto projector,lyrics",
  "removedTagsLength": 435,
  "title": "Pluto Projector",
  "genre": "None",
  "artist": "Rex Orange County",
  "artistCustomFormat": 0,
  "customFormat": "",
  "features": [],
  "hashtags": ["RexOrangeCounty", "PlutoProjector", "Lyrics"],
  "tiktok": "false",
  "channel": "none",
  "log": "true",
  "extras": {
    "titles": "Rex Orange County - Pluto Projector (Lyrics)=Rex Orange County - Pluto Projector [Lyrics]=Rex Orange County - Pluto Projector",
    "seo": {
      "text": "Rex Orange County=Pluto Projector=Rex Orange County Pluto Projector Lyrics=Pluto Projector Lyrics=Pluto Projector Rex Orange County=Rex Orange County Pluto Projector"
    },
    "array": {...}
  },
  "url": "/api/v1/generate?title=Pluto%20Projector&artist=Rex%20Orange%20County&features=none&tiktok=false&format=lyrics&channel=none&shuffle=false&genre=none&verse=none&custom=false&log=true&response=4ca45b7e-eaf6-45e0-80f6-6fd27d925030&example=false&source=web",
  "responseId": "4ca45b7e-eaf6-45e0-80f6-6fd27d925030",
  "length": 435
}
```

## Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## License

[MIT License](LICENSE)
