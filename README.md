# Lyrics Tags Generator ([tags.notnick.io](https://tags.notnick.io/))

This is a small utility tool for personal use, but you can also use it if you have a music channel on [YouTube](https://www.youtube.com).

## What to provide

- `Artist` _(Required)_
- `Title` _(Optional)_
- `Features` (Optional)
- `TikTok` (Optional)

If you think a different format works better, then please [submit an issue](https://github.com/alsonick/lyrics-tags-generator/issues/new?template=Blank+issue) or [email me](mailto:hi@notnick.io).

## Data

[Click here to open the json representation.](https://tags.notnick.io/api/gen?title=Don%27t%20Let%20Me%20Down&artist=The%20Chainsmokers&features=Daya&tiktok=false)

```json
{
  "success": true,
  "tags": "chris brown residuals,chris brown residuals lyrics,residuals lyrics,residuals chris brown lyrics,lyrics residuals,lyrics chris brown residuals,chris brown lyrics residuals,residuals lyrics chris brown,residuals lyric video,lyrics residuals chris brown,chris brown lyrics,lyrics chris brown,residuals,chris brown,residuals chris brown,lyrics",
  "tagsToBeRemoved": "",
  "removedTags": "chris brown residuals,chris brown residuals lyrics,residuals lyrics,residuals chris brown lyrics,lyrics residuals,lyrics chris brown residuals,chris brown lyrics residuals,residuals lyrics chris brown,residuals lyric video,lyrics residuals chris brown,chris brown lyrics,lyrics chris brown,residuals,chris brown,residuals chris brown,lyrics",
  "removedTagsLength": 340,
  "title": "Residuals",
  "artist": "Chris Brown",
  "features": [],
  "hashtags": ["ChrisBrown", "Residuals", "Lyrics"],
  "extras": {
    "titles": "Chris Brown - Residuals (Lyrics)=Chris Brown - Residuals [Lyrics]"
  },
  "url": "/api/generate?title=Residuals&artist=Chris%20Brown&features=none&tiktok=false&format=lyrics&channel=none",
  "length": 341
}
```

## Discord Bot

Using the [Discord](https://discord.com/) bot version is probably faster. You must also be familiar with [slash commands](https://support-apps.discord.com/hc/en-us/articles/26501837786775-Slash-Commands-FAQ).

[Click here to invite the discord bot to your server.](https://discord.com/oauth2/authorize?client_id=1338567480834265193&permissions=2147534848&integration_type=0&scope=bot)

Example:

<img width="450" src="https://github.com/user-attachments/assets/0c4d851b-8146-476f-9722-afd76fde5232" />

All requests are logged for debugging purposes.

<img width="450" src="https://github.com/user-attachments/assets/a1c34a5f-32d4-4881-afd7-ed39e7355450" />

Please [email](mailto:hi@notnick.io) me if you find any bugs.

## Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## License

MIT License

Copyright (c) 2025 Nicholas Njoki

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
