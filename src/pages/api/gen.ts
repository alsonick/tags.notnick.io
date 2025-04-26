import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get the query parameters
  const features: string = req.query.features as string;
  const channel: string = req.query.channel as string;
  const tiktok: string = req.query.tiktok as string;
  const format: string = req.query.format as string;
  const artist: string = req.query.artist as string;
  const title: string = req.query.title as string;

  // Check if all the required fields are provided
  if (!artist || !title || !tiktok) {
    return res.status(400).json({
      success: false,
      error: "Please provide all the required fields.",
    });
  }

  // Check if there are any commas in the title or artist
  if (/,/.test(title)) {
    return res.status(400).send({
      success: false,
      error: "Please remove any commas , from the title or artist.",
    });
  }

  // Typical tags format you'd use for lyric videos
  let tags = `${artist} ${title},${artist} ${title} lyrics,${title} lyrics,${title} ${artist} lyrics,lyrics ${title},lyrics ${artist} ${title},${artist} lyrics ${title},${title} lyrics ${artist},${title} lyric video,lyrics ${title} ${artist},${artist} lyrics,lyrics ${artist},${title},${artist}, ${title} ${artist}`;

  if (format === "bassboosted") {
    // Bass boosted tags
    tags = `${artist},${title},${title} bass boosted,${title} bass boosted ${artist},${title} ${artist},${title} ${artist} bass boosted,${artist} ${title} bass boosted,${artist} ${title},${artist} - ${title},${artist} - ${title} bass boosted,${title} ${artist} bass boost,${artist} bass boosted,${title} bass boost,bass boost,bass boosted,bass boosted car playlist, bass boost car playlist`;
  } else if (format === "nightcore") {
    // Nightcore/sped up tags
    tags = `${artist},${title},${title} nightcore,${title} sped up,${title} sped up ${artist},${artist} ${title},${artist} ${title} sped up,${artist} nightcore,${artist} sped up,nightcore`;
  } else if (format === "slowedreverb") {
    // Slowed/reverb tags
    tags = `${artist},${title},${artist} ${title},${artist} ${title} slowed,${artist} ${title} slowed reverb,${artist} ${title} slowed to perfection,${title} ${artist},${title} slowed,${artist} ${title} slowed,${title} slowed,${artist} - ${title},${artist} - ${title} slowed,${artist} - ${title} slowed reverb,${title} slowed reverb,${title} slowed to perfection,${artist} ${title} slowed and reverb,slowed and reverb songs`;
  } else if (format === "letra") {
    tags = `${artist},${title},${artist} ${title} letra,${artist} ${title},${title} ${artist},${title} letra,letra ${title},letra ${title} ${artist},${artist} letra,${artist} letra ${title},${title} letra ${artist},letra ${artist},${artist} - ${title},${artist} - ${title} letra`;
  }

  // Part to generate tags for tiktok option
  if (tiktok === "true") {
    if (format === "bassboosted") {
      // Bass boosted
    } else if (format === "nightcore") {
      // Nightcore/sped up
      tags += `${artist} ${title} sped up tiktok remix,${title} sped up tiktok version`;
    } else if (format === "slowedreverb") {
      // Slowed/reverb
      tags += `,slowed tiktok songs`;
    } else {
      // Lyrics
      tags += `,${title} tiktok,${artist} tiktok`;
    }
  }

  // Probably shouldn't generate tags for features if tiktok is true because there would be too many tags
  // Part to generate tags for features
  if (
    features.trimStart().trimEnd() !== "none" &&
    (tiktok === "false" || tiktok === "" || tiktok !== "true")
  ) {
    let feats = features.split(",").map((feat) => feat.trim());
    const firstFeat = feats[0];

    // Only generate tags for the first feature
    if (format.toLowerCase() === "bassboosted") {
      // Only generate a few tags for bass boosted features
      tags += `${firstFeat} ${title} bass boosted,${title} ${firstFeat} bass boosted, ${firstFeat} ${title} bass,${title} ${firstFeat} bass, ${feats[0]} bass`;
      if (feats.length >= 2) {
        // Second feat
        const secondFeat = feats[1];
      }
    } else if (format.toLowerCase() === "letra") {
      tags += `,${firstFeat} ${title},${title} ${firstFeat},${artist} ${firstFeat} ${title},${firstFeat} ${title} letra,${title} ${firstFeat},${artist} ${firstFeat},${firstFeat} ${artist},${firstFeat}`;
    } else if (format.toLowerCase() === "lyrics") {
      tags += `,${firstFeat} ${title} lyrics,lyrics ${firstFeat} ${title},${firstFeat} lyrics`;

      if (feats.length >= 2) {
        // Second feat
        const secondFeat = feats[1];
        tags += `,${artist} ${secondFeat} ${title} lyrics,${secondFeat} ${title} lyrics,lyrics ${secondFeat} ${title},${secondFeat} lyrics,lyrics ${secondFeat}`;
      }
    } else if (format.toLowerCase() === "slowedreverb") {
      tags += `,${firstFeat} ${title},${firstFeat} ${title} slowed,${artist} ${firstFeat} ${title} slowed,${firstFeat} ${title} slowed reverb,${firstFeat} slowed`;
    }
  }

  if (format.toLowerCase() === "lyrics") {
    tags += ",lyrics";
  } else if (format.toLowerCase() === "letra") {
    tags += ",letra,latin,latin music";
  }

  if (channel !== "none") {
    tags += `,${channel}`;
  }

  let endingTag = "Lyrics";
  let f: string = "";

  // Modify the ending tag based off the selected format
  if (format.trim() === "bassboosted") {
    endingTag = "BoostedBoosted";
  } else if (format.trim() === "nightcore") {
    endingTag = "Nightcore";
  } else if (format.trim() === "slowedreverb") {
    endingTag = "Slowed";
  }

  const feats: string[] = features
    .split(",")
    .map((feat) => `${feat[0].toUpperCase()}${feat.substring(1)}`);

  // Lyrics
  if (format.trim().toLowerCase() === "lyrics") {
    if (features.toLowerCase() !== "none") {
      if (feats.length === 1) {
        f += `${artist.trim()} - ${title.trim()} (Lyrics) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (Lyrics)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Lyrics)=${artist.trim()} - ${title.trim()} [Lyrics] ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} [Lyrics]=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Lyrics]`;
      }

      // If there are two features
      if (feats.length === 2) {
        f += `${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Lyrics) ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} (Lyrics) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()} - ${title.trim()} (Lyrics) ft. ${feats[0].trim()} & ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Lyrics] ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} [Lyrics] ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()} - ${title.trim()} [Lyrics] ft. ${feats[0].trim()} & ${feats[1].trim()}`;
      }

      // If there are three features
      if (feats.length === 3) {
        f += `${artist.trim()}, ${feats[0]} - ${title.trim()} (Lyrics) ft. ${
          feats[1]
        }, ${feats[2]}=${artist.trim()} - ${title.trim()} (Lyrics) ft. ${
          feats[0]
        }, ${feats[1]} & ${feats[2]}=${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} (Lyrics) ft. ${feats[1]} & ${
          feats[2]
        }=${artist.trim()}, ${feats[0]} - ${title.trim()} [Lyrics] ft. ${
          feats[1]
        }, ${feats[2]}=${artist.trim()} - ${title.trim()} [Lyrics] ft. ${
          feats[0]
        }, ${feats[1]} & ${feats[2]}=${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} [Lyrics] ft. ${feats[1]} & ${feats[2]}`;
      }
    } else {
      f += `${artist.trim()} - ${title.trim()} (Lyrics)=${artist.trim()} - ${title.trim()} [Lyrics]`;
    }
  }

  if (format.trim().toLowerCase() === "letra") {
    if (features.toLowerCase() !== "none") {
      if (feats.length === 1) {
        f += `${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Letra)=${artist.trim()} - ${title.trim()} (Letra) ft. ${feats[0].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Letra]=${artist.trim()} - ${title.trim()} [Letra] ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (Letra)=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} [Letra]`;
      }

      if (feats.length === 2) {
        f += `${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Letra) ft. ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Letra] ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} (Letra) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()} - ${title.trim()} [Letra] ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (Letra) ft. ${feats[1].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} [Letra] ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} (Letra) ft. ${feats[0].trim()} & ${feats[1].trim()}=${artist.trim()} - ${title.trim()} [Letra] ft. ${feats[0].trim()}, ${feats[1].trim()}`;
      }

      // Rare
      if (feats.length === 5) {
        f += `${artist.trim()} x ${feats[0].trim()} - ${title.trim()} (Letra) ft. ${feats[1].trim()}, ${feats[2].trim()}, ${feats[3].trim()}, ${feats[4].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Letra) ft. ${feats[1].trim()}, ${feats[2].trim()}, ${feats[3].trim()}, ${feats[4].trim()}=${artist.trim()} x ${feats[0].trim()} - ${title.trim()} [Letra] ft. ${feats[1].trim()}, ${feats[2].trim()}, ${feats[3].trim()}, ${feats[4].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} [Letra] ft. ${feats[1].trim()}, ${feats[2].trim()}, ${feats[3].trim()}, ${feats[4].trim()}`;
      }
    } else {
      f += `${artist.trim()} - ${title.trim()} (Letra)=${artist.trim()} - ${title.trim()} [Letra]`;
    }
  }

  // Slowed & Reverb
  if (format.trim().toLowerCase() === "slowedreverb") {
    if (features.toLowerCase() !== "none") {
      if (feats.length === 1) {
        f += `${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (slowed & reverb)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (slowed & reverb)`;
      }

      if (feats.length === 2) {
        f += `${artist.trim()}, ${feats[0]} & ${
          feats[1]
        } - ${title.trim()} (slowed & reverb)=${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} (slowed & reverb) ft. ${feats[1].trim()}`;
      }

      if (feats.length === 3) {
        f += `${artist.trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[0].trim()}, ${feats[1].trim()}, ${feats[2].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[1].trim()}, ${feats[2].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[1].trim()} & ${feats[2].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (slowed & reverb) ft. ${feats[1].trim()}, ${feats[2].trim()}`;
      }
    } else {
      f += `${artist.trim()} - ${title.trim()} (slowed & reverb)`;
    }
  }

  // Bass Boosted
  if (format.trim().toLowerCase() === "bassboosted") {
    if (features.toLowerCase() !== "none") {
      if (feats.length === 1) {
        f += `${artist.trim()} - ${title.trim()} (Bass Boosted) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} (Bass Boosted)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Bass Boosted)=
        ${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} 🔥 (Bass Boosted)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} 🔥 (Bass Boosted)=
        ${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${feats[0].trim()}=${artist.trim()} & ${feats[0].trim()} - ${title.trim()} 🔊 (Bass Boosted)=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} 🔊 (Bass Boosted)`;
      }

      // If there are two features
      if (feats.length === 2) {
        f += `${artist.trim()} - ${title.trim()} (Bass Boosted) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} (Bass Boosted) ft. ${feats[1].trim()}=${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} 🔥 (Bass Boosted) ft. ${feats[1].trim()}
        =${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${feats[0].trim()}, ${feats[1].trim()}=${artist.trim()}, ${feats[0].trim()} - ${title.trim()} 🔊 (Bass Boosted) ft. ${feats[1].trim()}`;
      }

      // If there are three features
      if (feats.length === 3) {
        f += `${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} (Bass Boosted) ft. ${feats[1]}, ${
          feats[2]
        }=${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} 🔥 (Bass Boosted) ft. ${feats[1]}, ${
          feats[2]
        }=${artist.trim()}, ${
          feats[0]
        } - ${title.trim()} 🔊 (Bass Boosted) ft. ${feats[1]}, ${feats[2]}`;
      }
    } else {
      f += `${artist.trim()} - ${title.trim()} (Bass Boosted)=${artist.trim()} - ${title.trim()} 🔥 (Bass Boosted)=${artist.trim()} - ${title.trim()} 🔊 (Bass Boosted)`;
    }
  }

  // Send the response
  res.status(200).json({
    success: true,
    tags: tags.toLowerCase(),
    tagsToRemove: "",
    removedTags: "",
    title: title.trim(),
    artist: artist.trim(),
    t: `${artist.trim()} - ${title.trim()}`,
    features:
      features.toLowerCase() !== "none"
        ? features
            .split(",")
            .map((feat) =>
              `${feat[0].toUpperCase()}${feat.substring(1)}`.trim()
            )
        : [],
    extras: {
      titles: f,
    },
    url: `/api/gen?title=${encodeURIComponent(
      title
    )}&artist=${encodeURIComponent(artist)}&features=${encodeURIComponent(
      features
    )}&tiktok=${
      tiktok === "" ? "false" : tiktok !== "true" ? "false" : "true"
    }&format=${format.trimStart().trimEnd()}`,
    length: tags
      .split(",")
      .map((tag) => tag.trim())
      .join(",  ").length,
  });
}
