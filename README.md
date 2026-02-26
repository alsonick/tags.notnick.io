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

| Params     | Required | Default  | Description                                                                                                                                                                              |
| ---------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `artist`   | `Yes`    | `none`   | Name of the artist. You can provide both the `artist` and the `title` components in this field, e.g. `Rex Orange County – Pluto Projector` is appropriate.                               |
| `title`    | `No`     | `none`   | Name of the song. Not required if both the `artist` and `title` components are provided in the `artist` parameter.field)                                                                 |
| `features` | `No`     | `none`   | Featured artists. If you provide more than 3 featuring artists, then only the first 3 features will be used when generating the tags. (comma-separated)                                  |
| `tiktok`   | `No`     | `false`  | Provides additional tags related to TikTok, It's recommended for songs that are performing well on TikTok (`true` / `false`).                                                            |
| `channel`  | `No`     | `none`   | The name of the YouTube channel you want featured in the generated tags.                                                                                                                 |
| `format`   | `No`     | `lyrics` | - `lyrics`<br>- `bassboosted`<br>- `nightcore`<br>- `slowed`<br>- `letra`<br>- `phonk`<br>- `testo`<br>- `none`                                                                          |
| `shuffle`  | No       | false    | The option to shuffle the generated tags (`true` or `false`).                                                                                                                            |
| `genre`    | `No`     | `none`   | - `none`<br>- `country`<br>- `latin`<br>- `phonk`<br>- `dance`<br>- `pop`<br>- `rap`<br>- `italian`                                                                                      |
| `verse`    | `No`     | `none`   | 3 short verses. Each individual verse should be separated by a comma.                                                                                                                    |
| `custom`   | `No`     | `none`   | The custom format string template that you want to use.                                                                                                                                  |
| `log`      | `No`     | `true`   | All request data (generated metadata) is logged for debugging purposes, if you wish to not have your data logged, then provide `false` as the parameter value.                           |
| `webhook`  | `No`     | `none`   | Request data is logged in private Discord text channels. You may optionally provide a webhook link to log data in your own private channel. Your webhook link is never stored or logged. |

### Endpoint

```
GET https://tags.notnick.io/api/v1/length
```

### Parameters

| Params | Required | Default | Description                                                                                                                         |
| ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `tags` | `Yes`    | `none`  | The generated tags you want to find the length for. Pass the raw comma-separated tag string returned from the `/generate` endpoint. |

---

### Custom Format Variables

We also allow you to define your own custom string template for generated tags. Here's what a string template typically looks like this:

`{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}`

You might be wondering what the `{}` parts are, we call them _variables_, and the letters inside them signify where the components of a song belong to. Let's take this song for example:

`Rex Orange County – Pluto Projector`

We break down the song into components and place them into their respective parts. `{a}` is for the 'artist' and `{b}` is for the 'title'. To use your custom string template, you must provide the song followed by a forward slash which is then followed by the string template you want to use. Here's an example:

`Rex Orange County - Pluto Projector/{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}`

Here are the available variables you can use in your custom string template:

| Variables | Components    | Description                                                                                    |
| --------- | ------------- | ---------------------------------------------------------------------------------------------- |
| `{a}`     | `artist`      | The main artist's name. This is always required when using a custom format string.             |
| `{t}`     | `title`       | The title of the song. Used to place the song title within your custom format string.          |
| `{f1}`    | `feature@{1}` | The first featured artist. Used to place the first feature within your custom format string.   |
| `{f2}`    | `feature@{2}` | The second featured artist. Used to place the second feature within your custom format string. |
| `{f3}`    | `feature@{3}` | The third featured artist. Used to place the third feature within your custom format string.   |

> We only support **three** features.

---

### JSON Representation Data

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
