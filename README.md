# Lyrics Tags Generator

A powerful YouTube tags generator specifically designed for lyric video creators. Generate optimized, customizable tags to help your lyric videos reach the right audience.

[![Website](https://img.shields.io/badge/website-tags.notnick.io-blue)](https://tags.notnick.io)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)](https://nextjs.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC)](https://tailwindcss.com/)

## Features

- **Smart Tag Generation** - Automatically generates relevant YouTube tags based on artist, title, and format
- **Multiple Format Support** - Bass Boosted, Nightcore/Sped Up, Slowed & Reverb, Letra, Testo, Phonk, and more
- **Genre-Specific Tags** - Optimized tags for Rap, Pop, Country, Latin, Italian, Dance, and Phonk
- **TikTok Integration** - Special tags for TikTok-trending songs
- **Featured Artists Support** - Automatically parses and includes featured artists (up to 3)
- **Custom Tag Variables** - Create your own tag patterns with `{a}`, `{t}`, `{f1}`, `{f2}`, `{f3}`
- **Verse Highlighting** - Include popular verses (up to 3) in your tags
- **Tag Shuffling** - Randomize tag order for variety
- **Channel Branding** - Include your channel name in tags

## Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

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
GET /api/v1/generate
```

### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `artist` | string | Artist name and song title (format: `Artist - Title` or `Artist, Featured - Title`) |
| `tiktok` | boolean | Whether the song is trending on TikTok |

### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | `"none"` | Song title (if not included in artist field) |
| `format` | string | `"none"` | Video format (bassboosted, nightcore, slowedreverb, letra, testo, phonk, lyrics, none) |
| `genre` | string | `"none"` | Music genre (rap, hiphop, country, pop, funk, phonk, latin, italian, dance, none) |
| `features` | string | `"none"` | Featured artists (comma-separated) |
| `channel` | string | `"none"` | YouTube channel name |
| `verse` | string | `"none"` | Popular verses (comma-separated, max 3) |
| `shuffle` | string | `"false"` | Shuffle tag order |
| `log` | string | `"true"` | Log to Discord webhook |
| `source` | string | `"unknown"` | Request source |
| `example` | string | `"false"` | Example mode |
| `webhook` | string | `"none"` | Custom Discord webhook URL |

### Custom Format Variables

Use custom tag patterns by appending `/{pattern}` to the artist field:

| Variable | Description |
|----------|-------------|
| `{a}` | Main artist name |
| `{t}` | Song title |
| `{f1}` | First featured artist |
| `{f2}` | Second featured artist |
| `{f3}` | Third featured artist |

#### Example

```
GET /api/v1/generate?artist=Future, Drake, Tems, Young Thug - Wait For U/{a},{f1},{f2},{f3},{t}&tiktok=true
```

This generates tags in the pattern: `Future,Drake,Tems,Young Thug,Wait For U`

### Response Format

```json
{
  "success": true,
  "tags": "artist,song,title,format,tags",
  "removedTags": "filtered,tags,without,duplicates",
  "title": "Song Title",
  "artist": "Artist Name",
  "features": ["Featured Artist 1", "Featured Artist 2"],
  "hashtags": ["#Artist", "#Title", "#Format"],
  "genre": "Pop",
  "tiktok": "true",
  "channel": "channel-name",
  "length": 450,
  "customFormat": "{a},{t},{f1}",
  "extras": {
    "titles": "alternative=title=variations",
    "array": {
      "tags": ["tag1", "tag2", "tag3"],
      "removedTags": ["filtered1", "filtered2"],
      "titles": ["title1", "title2"]
    }
  },
  "responseId": "uuid-v4-string",
  "url": "generated-url-with-params"
}
```

## Usage Examples

### Basic Usage
```
https://tags.notnick.io/api/v1/generate?artist=The Weeknd - Blinding Lights&tiktok=true&format=slowedreverb
```

### With Featured Artists
```
https://tags.notnick.io/api/v1/generate?artist=Mariah the Scientist, Kali Uchis - Is It a Crime&tiktok=false&format=lyrics
```

### Custom Tag Pattern
```
https://tags.notnick.io/api/v1/generate?artist=Drake - Hotline Bling/{a},{t},hotline,bling&tiktok=true
```

### With Genre and Verses
```
https://tags.notnick.io/api/v1/generate?artist=Kendrick Lamar - HUMBLE.&tiktok=true&genre=rap&verse=sit down be humble,nobody pray for me
```

## Development

### Project Structure

```
.
├── src/
│   ├── pages/
│   │   ├── api/v1/
│   │   │   └── generate.ts      # Main API endpoint
│   │   └── index.tsx            # Homepage
│   ├── lib/
│   │   ├── helpers/
│   │   │   ├── tags/            # Tag generation helpers
│   │   │   └── titles/          # Title generation helpers
│   │   └── constants.ts         # App constants
│   └── components/              # React components
├── public/                      # Static assets
└── README.md
```

### Running Tests

```bash
npm run test
# or
yarn test
```

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Nicholas Njoki**

- Website: [tags.notnick.io](https://tags.notnick.io)
- GitHub: [@alsonick](https://github.com/alsonick)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

---

<p align="center">Made with ❤️ for lyric video creators</p>


