import { TemplateStringFormatList } from "@/types/template-string-format-list";
import { generateRandomId } from "./generate-random-id";

export const TEMPLATE_STRING_FORMAT_LIST: TemplateStringFormatList[] = [
  {
    id: generateRandomId(),
    filter: "lyrics",
    formats: [
      {
        id: generateRandomId(),
        constraint: "(lyrics)::[default]",
        template:
          "{artist} {title},{artist} {title} lyrics,{title} lyrics,{title} {artist} lyrics,lyrics {title},{artist} lyrics {title},{title} lyric video,{artist} lyrics,lyrics {artist},{title},{artist},{title} {artist},lyrics {title} {artist},lyrics {artist} {title},lyrics",
      },
      {
        id: generateRandomId(),
        constraint: "(lyrics)::[feature-1]",
        template:
          "{firstFeature},{firstFeature} {title} lyrics,lyrics {firstFeature} {title},{firstFeature} lyrics,{firstFeature} {title},{artist} {firstFeature},{title} {firstFeature}",
      },
      {
        id: generateRandomId(),
        constraint: "(lyrics)::includes[default]&&[feature-1]",
        template:
          "{artist} {title},{artist} {title} lyrics,{title} lyrics,{title} {artist} lyrics,lyrics {title},{artist} lyrics {title},{title} lyric video,{artist} lyrics,lyrics {artist},{title},{artist},{title} {artist},lyrics {title} {artist},lyrics {artist} {title},lyrics,{firstFeature},{firstFeature} {title} lyrics,lyrics {firstFeature} {title},{firstFeature} lyrics,{firstFeature} {title},{artist} {firstFeature},{title} {firstFeature}",
      },
      {
        id: generateRandomId(),
        constraint: "(lyrics)::[feature-2]",
        template:
          "{secondFeature},{secondFeature} {title} lyrics,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}",
      },
      {
        id: generateRandomId(),
        constraint: "(lyrics)::includes[default]&&[feature-1]&&[feature-2]",
        template:
          "{artist} {title},{artist} {title} lyrics,{title} lyrics,{title} {artist} lyrics,lyrics {title},{artist} lyrics {title},{title} lyric video,{artist} lyrics,lyrics {artist},{title},{artist},{title} {artist},lyrics {title} {artist},lyrics {artist} {title},lyrics,{firstFeature},{firstFeature} {title} lyrics,lyrics {firstFeature} {title},{firstFeature} lyrics,{firstFeature} {title},{artist} {firstFeature},{title} {firstFeature},{secondFeature},{secondFeature} {title} lyrics,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}",
      },
      {
        id: generateRandomId(),
        constraint: "(lyrics)::[feature-3]",
        template:
          "{thirdFeature},{thirdFeature} {title} lyrics,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}",
      },
      {
        id: generateRandomId(),
        constraint: "(lyrics)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]",
        template:
          "{artist} {title},{artist} {title} lyrics,{title} lyrics,{title} {artist} lyrics,lyrics {title},{artist} lyrics {title},{title} lyric video,{artist} lyrics,lyrics {artist},{title},{artist},{title} {artist},lyrics {title} {artist},lyrics {artist} {title},lyrics,{firstFeature},{firstFeature} {title} lyrics,lyrics {firstFeature} {title},{firstFeature} lyrics,{firstFeature} {title},{artist} {firstFeature},{title} {firstFeature},{secondFeature},{secondFeature} {title} lyrics,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature},{thirdFeature},{thirdFeature} {title} lyrics,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}",
      },
      {
        id: generateRandomId(),
        constraint: "(lyrics)::[@tiktok=true@]",
        template: "tiktok,{title} tiktok,trending tiktok,tiktok songs",
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: "bassboosted",
    formats: [
      {
        id: generateRandomId(),
        constraint: "(bassboosted)::[default]",
        template:
          "{artist},{title},{title} bass boosted,{title} bass boosted {artist},{title} {artist},{title} {artist} bass boosted,{artist} {title} bass boosted,{artist} {title},{artist} - {title},{artist} - {title} bass boosted,{title} {artist} bass boost,{artist} bass boosted,{title} bass boost,bass boost,bass boosted,bass boosted car playlist,bass boost car playlist",
      },
      {
        id: generateRandomId(),
        constraint: "(bassboosted)::[feature-1]",
        template: "{firstFeature},{firstFeature} {title} bass boosted",
      },
      {
        id: generateRandomId(),
        constraint: "(bassboosted)::includes[default]&&[feature-1]",
        template:
          "{artist},{title},{title} bass boosted,{title} bass boosted {artist},{title} {artist},{title} {artist} bass boosted,{artist} {title} bass boosted,{artist} {title},{artist} - {title},{artist} - {title} bass boosted,{title} {artist} bass boost,{artist} bass boosted,{title} bass boost,bass boost,bass boosted,bass boosted car playlist,bass boost car playlist,{firstFeature},{firstFeature} {title} bass boosted",
      },
      {
        id: generateRandomId(),
        constraint: "(bassboosted)::[feature-2]",
        template: "{secondFeature},{secondFeature} {title} bass boosted",
      },
      {
        id: generateRandomId(),
        constraint: "(bassboosted)::includes[default]&&[feature-1]&&[feature-2]",
        template:
          "{artist},{title},{title} bass boosted,{title} bass boosted {artist},{title} {artist},{title} {artist} bass boosted,{artist} {title} bass boosted,{artist} {title},{artist} - {title},{artist} - {title} bass boosted,{title} {artist} bass boost,{artist} bass boosted,{title} bass boost,bass boost,bass boosted,bass boosted car playlist,bass boost car playlist,{firstFeature},{firstFeature} {title} bass boosted,{secondFeature},{secondFeature} {title} bass boosted",
      },
      {
        id: generateRandomId(),
        constraint: "(bassboosted)::[feature-3]",
        template: "{thirdFeature},{thirdFeature} {title} bass boosted",
      },
      {
        id: generateRandomId(),
        constraint: "(bassboosted)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]",
        template:
          "{artist},{title},{title} bass boosted,{title} bass boosted {artist},{title} {artist},{title} {artist} bass boosted,{artist} {title} bass boosted,{artist} {title},{artist} - {title},{artist} - {title} bass boosted,{title} {artist} bass boost,{artist} bass boosted,{title} bass boost,bass boost,bass boosted,bass boosted car playlist,bass boost car playlist,{firstFeature},{firstFeature} {title} bass boosted,{secondFeature},{secondFeature} {title} bass boosted,{thirdFeature},{thirdFeature} {title} bass boosted",
      },
      {
        id: generateRandomId(),
        constraint: "(bassboosted)::[@tiktok=true@]",
        template: "tiktok,{title} tiktok,trending tiktok,tiktok songs",
      },
    ],
  },
];
