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

## Documentation

The full interactive documentation is available at [tags.notnick.io/documentation](https://tags.notnick.io/documentation).

### Introduction

The Lyrics Tags Generator API is a free, public API that generates SEO-optimized YouTube metadata for your lyric videos, including tags, titles, hashtags, and keywords. It is completely free and requires no API key. Send a `GET` request to one of the endpoints below and you'll receive a JSON response. All parameters are passed as query string values.

| Base URL          | Authentication | Response |
| ----------------- | -------------- | -------- |
| `tags.notnick.io` | None           | JSON     |

### Endpoints

#### `GET /api/v1/generate`

Generate optimized YouTube tags, title suggestions, hashtags, and SEO metadata for a song.

**Example request**

```bash
curl "https://tags.notnick.io/api/v1/generate?\
artist=Rex%20Orange%20County%20-%20Pluto%20Projector&format=lyrics"
```

```js
const params = new URLSearchParams({
  artist: "Rex Orange County - Pluto Projector",
  format: "lyrics",
});

const res = await fetch(`https://tags.notnick.io/api/v1/generate?${params}`);
const data = await res.json();
```

**Example response**

```json
{
  "success": true,
  "tags": "rex orange county pluto projector,rex orange county pluto projector lyrics,pluto projector lyrics,pluto projector rex orange county lyrics,lyrics pluto projector,rex orange county lyrics pluto projector,pluto projector,rex orange county,pluto projector rex orange county,lyrics",
  "tagsToBeRemoved": "",
  "removedTags": "rex orange county pluto projector,rex orange county pluto projector lyrics,pluto projector lyrics,pluto projector rex orange county lyrics,lyrics pluto projector,rex orange county lyrics pluto projector,pluto projector,rex orange county,pluto projector rex orange county,lyrics",
  "removedTagsLength": 295,
  "title": "Pluto Projector",
  "genre": "None",
  "artist": "Rex Orange County",
  "artistCustomFormat": 0,
  "customFormat": "",
  "features": [],
  "hashtags": ["RexOrangeCounty", "PlutoProjector", "Lyrics"],
  "tiktok": "none",
  "channel": "none",
  "log": "true",
  "extras": {
    "titles": "Rex Orange County - Pluto Projector (Lyrics)=Rex Orange County - Pluto Projector [Lyrics]=Rex Orange County - Pluto Projector",
    "seo": {
      "text": "Rex Orange County=Pluto Projector=Rex Orange County Pluto Projector Lyrics=Pluto Projector Lyrics=Pluto Projector Rex Orange County=Rex Orange County Pluto Projector"
    },
    "array": {
      "removedTags": ["..."],
      "titles": ["..."],
      "tags": ["..."]
    }
  },
  "url": "/api/v1/generate?title=Pluto%20Projector&artist=Rex%20Orange%20County&features=none&tiktok=false&format=lyrics&channel=none&shuffle=false&genre=none&verse=none&custom=false&log=true&response=415c9517-81cd-4164-a3bd-6c1dafeeb147&example=false&source=unknown",
  "responseId": "415c9517-81cd-4164-a3bd-6c1dafeeb147",
  "length": 295
}
```

#### `GET /api/v1/length`

Calculate the total character length of a comma-separated tag string.

**Example request**

```bash
curl "https://tags.notnick.io/api/v1/length?\
tags=pluto%20projector%20lyrics,lyrics%20pluto%20projector"
```

```js
const params = new URLSearchParams({
  tags: "pluto projector lyrics,lyrics pluto projector",
});

const res = await fetch(`https://tags.notnick.io/api/v1/length?${params}`);
const data = await res.json();
```

**Example response**

```json
{
  "success": true,
  "length": 49
}
```

### Generate Parameters

Parameters accepted by the `/v1/generate` endpoint.

| Params     | Required | Default  | Description                                                                                                                                                                              |
| ---------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `artist`   | `Yes`    | `none`   | Name of the artist. You can provide both the `artist` and the `title` components in this field, e.g. `Rex Orange County - Pluto Projector` is appropriate.                               |
| `title`    | `Yes`    | `none`   | Name of the song. Not required if both the artist and title components are provided in the `artist` parameter.                                                                          |
| `features` | `No`     | `none`   | Featured artists. If you provide more than 3 featuring artists, then only the first 3 features will be used when generating the tags.                                                   |
| `tiktok`   | `No`     | `false`  | Provides additional tags related to TikTok. It's recommended for songs that are performing well on TikTok (`true` / `false`).                                                           |
| `channel`  | `No`     | `none`   | The name of the YouTube channel you want featured in the generated tags.                                                                                                                |
| `format`   | `No`     | `lyrics` | `lyrics`, `bassboosted`, `nightcore`, `slowed`, `letra`, `phonk`, `testo`, `none`                                                                                                        |
| `shuffle`  | `No`     | `false`  | The option to shuffle the generated tags (`true` or `false`).                                                                                                                            |
| `genre`    | `No`     | `none`   | `none`, `country`, `latin`, `phonk`, `dance`, `pop`, `rap`, `italian`                                                                                                                    |
| `verse`    | `No`     | `none`   | 3 short verses. Each individual verse should be separated by a comma.                                                                                                                    |
| `custom`   | `No`     | `none`   | The custom format string template that you want to use.                                                                                                                                  |
| `log`      | `No`     | `true`   | All request data (generated metadata) is logged for debugging purposes; if you wish to not have your data logged, then provide `false` as the parameter value.                           |
| `webhook`  | `No`     | `none`   | Request data is logged in private Discord text channels. You may optionally provide a webhook link to log data in your own private channel. Your webhook link is never stored or logged. |

### Length Parameters

Parameters accepted by the `/v1/length` endpoint.

| Params | Required | Default | Description                                                                                                                          |
| ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `tags` | `Yes`    | `none`  | The generated tags you want to find the length for. Pass the raw comma-separated tag string returned from the `/generate` endpoint. |

### Custom String Template

Define your own template to control exactly how generated tags are structured. Here's what a string template typically looks like:

```
{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}
```

You might be wondering what the `{}` parts are, we call them _variables_, and the letters inside them signify where the components of a song belong to. Let's take this song for example:

`Rex Orange County - Pluto Projector`

We break down the song into components and place them into their respective parts. `{a}` is for the 'artist' and `{t}` is for the 'title'. To use your custom string template, you must provide the song followed by a forward slash which is then followed by the string template you want to use. Here's an example:

```
Rex Orange County - Pluto Projector/{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}
```

Here are the available variables you can use in your custom string template:

| Variables | Components  | Description                                                     |
| --------- | ----------- | ---------------------------------------------------------------- |
| `{a}`     | `artist`    | This is always required when using a custom format string.      |
| `{t}`     | `title`     | Used to place the song title within your custom format string.  |
| `{f1}`    | `feature-1` | Used to place the first feature within your custom format string.  |
| `{f2}`    | `feature-2` | Used to place the second feature within your custom format string. |
| `{f3}`    | `feature-3` | Used to place the third feature within your custom format string.  |

> We only support up to **three** features. Supporting more wouldn't help with ranking optimization, since the first 2-3 features on a song typically carry the most ranking weight, and the most well-known features are usually listed first. Viewers rarely search for a song using its full feature list.

### Additional Tags

Append seasonal tags for events like Halloween and Christmas. Let's say you want to generate Christmas additional tags for the following song:

`Rex Orange County - Pluto Projector`

You would need to append the `\christmas` flag after the end of the song, here's how it would look:

`Rex Orange County - Pluto Projector\christmas`

Here's the resulting tags:

```
rex orange county pluto projector lyrics, pluto projector lyrics, lyrics pluto projector,
rex orange county pluto projector, christmas songs, christmas music, christmas <current year>,
christmas playlist
```

See the [available additional tags formats](https://tags.notnick.io/format). You can propose new additional tags by [creating an issue on GitHub](https://github.com/Lyrics-Tags-Generator/formats/issues/new) with your suggestion.

### Discord Bot

Prefer to stay in Discord? The Lyrics Tags Generator is also available as a [Discord bot](https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot), so you and your members can generate YouTube metadata with a few slash commands.

#### Installing the bot

You'll need the **Manage Server** permission on the server you want to add the bot to.

1. Open the [bot invite link](https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot).
2. Pick your server from the **Add to Server** dropdown.
3. Review the requested permissions and click **Authorize**.
4. The bot will appear in your server's member list, ready to use.

#### Using the bot

In any channel the bot can access, you can run the following slash commands:

| Command     | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| `/feedback` | Send feedback, suggestions, or report an issue to the developer.  |
| `/generate` | YouTube metadata, only tags and hashtags data is included.        |
| `/length`   | Check the total character length of a generated tag string.       |

> For the `/generate` endpoint route, the **artist** component is required, the **title** component is not required if both the **artist** and **title** components are provided in the **artist** field.

#### `/generate` options

| Option     | Required | Default  |
| ---------- | -------- | -------- |
| `artist`   | `Yes`    | —        |
| `format`   | `No`     | `Lyrics` |
| `genre`    | `No`     | `None`   |
| `title`    | `No`     | `None`   |
| `features` | `No`     | `None`   |
| `channel`  | `No`     | `None`   |
| `shuffle`  | `No`     | `Yes`    |
| `verse`    | `No`     | `None`   |
| `tiktok`   | `No`     | `No`     |
| `context`  | `No`     | `No`     |

#### `/length` options

| Option | Required | Default |
| ------ | -------- | ------- |
| `tags` | `Yes`    | —       |

### Format Templates

Every format is built from a **format string template**: a comma-separated list of tag patterns where variables are swapped out for the song's components. The available variables are `{artist}`, `{title}`, `{firstFeature}`, `{secondFeature}`, and `{thirdFeature}`.

Each format has several templates, chosen based on a constraint. The constraint reflects how many featured artists are present (`feature-1`, `feature-2`, `feature-3`) and whether TikTok tags are enabled (`@tiktok=true@`).

View the [full format reference](https://tags.notnick.io/format) for every supported and additional format.

### Further Assistance

If you have any questions or need further assistance, feel free to reach out at [hi@notnick.io](mailto:hi@notnick.io).

## Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## License

[MIT License](LICENSE)
