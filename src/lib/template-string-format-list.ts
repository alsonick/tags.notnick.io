import { TemplateStringFormatList } from '@/types/template-string-format-list';
import { generateRandomId } from './generate-random-id';

export const TEMPLATE_STRING_FORMAT_LIST: TemplateStringFormatList[] = [
  {
    id: generateRandomId(),
    filter: 'lyrics',
    formats: [
      {
        id: generateRandomId(),
        constraint: '(lyrics)::[default]',
        template:
          '{artist} {title},{artist} {title} lyrics,{title} lyrics,{title} {artist} lyrics,lyrics {title},{artist} lyrics {title},{artist} lyrics,lyrics {artist},{title},{artist},{title} {artist},lyrics {title} {artist},lyrics {artist} {title},lyrics',
      },
      {
        id: generateRandomId(),
        constraint: '(lyrics)::[feature-1]',
        template:
          '{firstFeature},{firstFeature} {title} lyrics,lyrics {firstFeature} {title},{firstFeature} lyrics,{firstFeature} {title},{artist} {firstFeature},{title} {firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(lyrics)::includes[default]&&[feature-1]',
        template:
          '{artist} {title},{artist} {title} lyrics,{title} lyrics,{title} {artist} lyrics,lyrics {title},{artist} lyrics {title},{artist} lyrics,lyrics {artist},{title},{artist},{title} {artist},lyrics {title} {artist},lyrics {artist} {title},lyrics,{firstFeature},{firstFeature} {title} lyrics,lyrics {firstFeature} {title},{firstFeature} lyrics,{firstFeature} {title},{artist} {firstFeature},{title} {firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(lyrics)::[feature-2]',
        template:
          '{secondFeature},{secondFeature} {title} lyrics,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(lyrics)::includes[default]&&[feature-1]&&[feature-2]',
        template:
          '{artist} {title},{artist} {title} lyrics,{title} lyrics,{title} {artist} lyrics,lyrics {title},{artist} lyrics {title},{artist} lyrics,lyrics {artist},{title},{artist},{title} {artist},lyrics {title} {artist},lyrics {artist} {title},lyrics,{firstFeature},{firstFeature} {title} lyrics,lyrics {firstFeature} {title},{firstFeature} lyrics,{firstFeature} {title},{artist} {firstFeature},{title} {firstFeature},{secondFeature},{secondFeature} {title} lyrics,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(lyrics)::[feature-3]',
        template:
          '{thirdFeature},{thirdFeature} {title} lyrics,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(lyrics)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]',
        template:
          '{artist} {title},{artist} {title} lyrics,{title} lyrics,{title} {artist} lyrics,lyrics {title},{artist} lyrics {title},{artist} lyrics,lyrics {artist},{title},{artist},{title} {artist},lyrics {title} {artist},lyrics {artist} {title},lyrics,{firstFeature},{firstFeature} {title} lyrics,lyrics {firstFeature} {title},{firstFeature} lyrics,{firstFeature} {title},{artist} {firstFeature},{title} {firstFeature},{secondFeature},{secondFeature} {title} lyrics,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature},{thirdFeature},{thirdFeature} {title} lyrics,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(lyrics)::[@tiktok=true@]',
        template: 'tiktok,{title} tiktok,trending tiktok,tiktok songs',
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'bassboosted',
    formats: [
      {
        id: generateRandomId(),
        constraint: '(bassboosted)::[default]',
        template:
          '{artist},{title},{title} bass boosted,{title} bass boosted {artist},{title} {artist},{title} {artist} bass boosted,{artist} {title} bass boosted,{artist} {title},{artist} - {title},{artist} - {title} bass boosted,{title} {artist} bass boost,{artist} bass boosted,{title} bass boost,bass boost,bass boosted,bass boosted car playlist,bass boost car playlist',
      },
      {
        id: generateRandomId(),
        constraint: '(bassboosted)::[feature-1]',
        template: '{firstFeature},{firstFeature} {title} bass boosted',
      },
      {
        id: generateRandomId(),
        constraint: '(bassboosted)::includes[default]&&[feature-1]',
        template:
          '{artist},{title},{title} bass boosted,{title} bass boosted {artist},{title} {artist},{title} {artist} bass boosted,{artist} {title} bass boosted,{artist} {title},{artist} - {title},{artist} - {title} bass boosted,{title} {artist} bass boost,{artist} bass boosted,{title} bass boost,bass boost,bass boosted,bass boosted car playlist,bass boost car playlist,{firstFeature},{firstFeature} {title} bass boosted',
      },
      {
        id: generateRandomId(),
        constraint: '(bassboosted)::[feature-2]',
        template: '{secondFeature},{secondFeature} {title} bass boosted',
      },
      {
        id: generateRandomId(),
        constraint: '(bassboosted)::includes[default]&&[feature-1]&&[feature-2]',
        template:
          '{artist},{title},{title} bass boosted,{title} bass boosted {artist},{title} {artist},{title} {artist} bass boosted,{artist} {title} bass boosted,{artist} {title},{artist} - {title},{artist} - {title} bass boosted,{title} {artist} bass boost,{artist} bass boosted,{title} bass boost,bass boost,bass boosted,bass boosted car playlist,bass boost car playlist,{firstFeature},{firstFeature} {title} bass boosted,{secondFeature},{secondFeature} {title} bass boosted',
      },
      {
        id: generateRandomId(),
        constraint: '(bassboosted)::[feature-3]',
        template: '{thirdFeature},{thirdFeature} {title} bass boosted',
      },
      {
        id: generateRandomId(),
        constraint: '(bassboosted)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]',
        template:
          '{artist},{title},{title} bass boosted,{title} bass boosted {artist},{title} {artist},{title} {artist} bass boosted,{artist} {title} bass boosted,{artist} {title},{artist} - {title},{artist} - {title} bass boosted,{title} {artist} bass boost,{artist} bass boosted,{title} bass boost,bass boost,bass boosted,bass boosted car playlist,bass boost car playlist,{firstFeature},{firstFeature} {title} bass boosted,{secondFeature},{secondFeature} {title} bass boosted,{thirdFeature},{thirdFeature} {title} bass boosted',
      },
      {
        id: generateRandomId(),
        constraint: '(bassboosted)::[@tiktok=true@]',
        template: 'tiktok,{title} tiktok,trending tiktok,tiktok songs',
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'nightcore',
    formats: [
      {
        id: generateRandomId(),
        constraint: '(nightcore)::[default]',
        template:
          '{artist},{title},{title} nightcore,{title} sped up,{title} sped up {artist},{artist} {title},{artist} {title} sped up,{artist} nightcore,{artist} sped up,nightcore',
      },
      {
        id: generateRandomId(),
        constraint: '(nightcore)::[feature-1]',
        template: '{firstFeature},{artist} {firstFeature},{firstFeature} {title},title {firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(nightcore)::includes[default]&&[feature-1]',
        template:
          '{artist},{title},{title} nightcore,{title} sped up,{title} sped up {artist},{artist} {title},{artist} {title} sped up,{artist} nightcore,{artist} sped up,nightcore,{firstFeature},{artist} {firstFeature},{firstFeature} {title},title {firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(nightcore)::[feature-2]',
        template: '{secondFeature},{artist} {secondFeature},{secondFeature} {title},title {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(nightcore)::includes[default]&&[feature-1]&&[feature-2]',
        template:
          '{artist},{title},{title} nightcore,{title} sped up,{title} sped up {artist},{artist} {title},{artist} {title} sped up,{artist} nightcore,{artist} sped up,nightcore,{firstFeature},{artist} {firstFeature},{firstFeature} {title},title {firstFeature},{secondFeature},{artist} {secondFeature},{secondFeature} {title},title {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(nightcore)::[feature-3]',
        template: '{thirdFeature},{artist} {thirdFeature},{thirdFeature} {title},title {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(nightcore)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]',
        template:
          '{artist},{title},{title} nightcore,{title} sped up,{title} sped up {artist},{artist} {title},{artist} {title} sped up,{artist} nightcore,{artist} sped up,nightcore,{firstFeature},{artist} {firstFeature},{firstFeature} {title},title {firstFeature},{secondFeature},{artist} {secondFeature},{secondFeature} {title},title {secondFeature},{thirdFeature},{artist} {thirdFeature},{thirdFeature} {title},title {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(nightcore)::[@tiktok=true@]',
        template: '{artist} {title} sped up tiktok remix,{title} sped up tiktok version',
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'slowed',
    formats: [
      {
        id: generateRandomId(),
        constraint: '(slowed)::[default]',
        template:
          '{artist},{title},{artist} {title},{artist} {title} slowed,{artist} {title} slowed reverb,{artist} {title} slowed to perfection,{title} {artist},{title} slowed,{artist} - {title},{artist} - {title} slowed,{artist} - {title} slowed reverb,{title} slowed to perfection,{artist} {title} slowed and reverb,slowed and reverb songs',
      },
      {
        id: generateRandomId(),
        constraint: '(slowed)::[feature-1]',
        template: '{firstFeature} {title} slowed,{artist} {firstFeature} {title} slowed,{firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(slowed)::includes[default]&&[feature-1]',
        template:
          '{artist},{title},{artist} {title},{artist} {title} slowed,{artist} {title} slowed reverb,{artist} {title} slowed to perfection,{title} {artist},{title} slowed,{artist} - {title},{artist} - {title} slowed,{artist} - {title} slowed reverb,{title} slowed to perfection,{artist} {title} slowed and reverb,slowed and reverb songs,{firstFeature} {title} slowed,{artist} {firstFeature} {title} slowed,{firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(slowed)::[feature-2]',
        template: '{secondFeature},{artist} {secondFeature},{secondFeature} {title},title {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(slowed)::includes[default]&&[feature-1]&&[feature-2]',
        template:
          '{artist},{title},{artist} {title},{artist} {title} slowed,{artist} {title} slowed reverb,{artist} {title} slowed to perfection,{title} {artist},{title} slowed,{artist} - {title},{artist} - {title} slowed,{artist} - {title} slowed reverb,{title} slowed to perfection,{artist} {title} slowed and reverb,slowed and reverb songs,{firstFeature} {title} slowed,{artist} {firstFeature} {title} slowed,{firstFeature},{secondFeature},{artist} {secondFeature},{secondFeature} {title},title {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(slowed)::[feature-3]',
        template: '{thirdFeature},{artist} {thirdFeature},{thirdFeature} {title},title {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(slowed)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]',
        template:
          '{artist},{title},{artist} {title},{artist} {title} slowed,{artist} {title} slowed reverb,{artist} {title} slowed to perfection,{title} {artist},{title} slowed,{artist} - {title},{artist} - {title} slowed,{artist} - {title} slowed reverb,{title} slowed to perfection,{artist} {title} slowed and reverb,slowed and reverb songs,{firstFeature} {title} slowed,{artist} {firstFeature} {title} slowed,{firstFeature},{secondFeature},{artist} {secondFeature},{secondFeature} {title},title {secondFeature},{thirdFeature},{artist} {thirdFeature},{thirdFeature} {title},title {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(slowed)::[@tiktok=true@]',
        template: 'slowed tiktok songs,{title} slowed down tiktok version',
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'letra',
    formats: [
      {
        id: generateRandomId(),
        constraint: '(letra)::[default]',
        template:
          '{artist},{title},{artist} {title} letra,{artist} {title},{title} {artist},{title} letra,letra {title},letra {title} {artist},{artist} letra,{artist} letra {title},{title} letra {artist},letra {artist},{artist} - {title},{artist} - {title}',
      },
      {
        id: generateRandomId(),
        constraint: '(letra)::[feature-1]',
        template:
          '{firstFeature} {title},{artist} {firstFeature} {title},{firstFeature} {title} letra,{title} {firstFeature},{artist} {firstFeature},{firstFeature} {artist},{firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(letra)::includes[default]&&[feature-1]',
        template:
          '{artist},{title},{artist} {title} letra,{artist} {title},{title} {artist},{title} letra,letra {title},letra {title} {artist},{artist} letra,{artist} letra {title},{title} letra {artist},letra {artist},{artist} - {title},{artist} - {title},{firstFeature} {title},{artist} {firstFeature} {title},{firstFeature} {title} letra,{title} {firstFeature},{artist} {firstFeature},{firstFeature} {artist},{firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(letra)::[feature-2]',
        template:
          '{secondFeature},{secondFeature} {title} letra,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}',
      },

      {
        id: generateRandomId(),
        constraint: '(letra)::includes[default]&&[feature-1]&&[feature-2]',
        template:
          '{artist},{title},{artist} {title} letra,{artist} {title},{title} {artist},{title} letra,letra {title},letra {title} {artist},{artist} letra,{artist} letra {title},{title} letra {artist},letra {artist},{artist} - {title},{artist} - {title},{firstFeature} {title},{artist} {firstFeature} {title},{firstFeature} {title} letra,{title} {firstFeature},{artist} {firstFeature},{firstFeature} {artist},{firstFeature},{secondFeature},{secondFeature} {title} letra,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(letra)::[feature-3]',
        template:
          '{thirdFeature},{thirdFeature} {title} letra,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(letra)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]',
        template:
          '{artist},{title},{artist} {title} letra,{artist} {title},{title} {artist},{title} letra,letra {title},letra {title} {artist},{artist} letra,{artist} letra {title},{title} letra {artist},letra {artist},{artist} - {title},{artist} - {title},{firstFeature} {title},{artist} {firstFeature} {title},{firstFeature} {title} letra,{title} {firstFeature},{artist} {firstFeature},{firstFeature} {artist},{firstFeature},{secondFeature},{secondFeature} {title} letra,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature},{thirdFeature},{thirdFeature} {title} letra,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(letra)::[@tiktok=true@]',
        template: '{title} tiktok,{artist} tiktok,latin tiktok',
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'testo',
    formats: [
      {
        id: generateRandomId(),
        constraint: '(testo)::[default]',
        template:
          '{artist},{title},{artist} {title} testo,{artist} {title},{title} {artist},{title} testo,testo {title},testo {title} {artist},{artist} testo,{artist} testo {title},{title} testo {artist},testo {artist},{artist} - {title},{artist} - {title} testo,testo',
      },
      {
        id: generateRandomId(),
        constraint: '(testo)::[feature-1]',
        template:
          '{firstFeature} {title},{artist} {firstFeature} {title},{firstFeature} {title} testo,{title} {firstFeature},{artist} {firstFeature},{firstFeature} {artist},{firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(testo)::includes[default]&&[feature-1]',
        template:
          '{artist},{title},{artist} {title} testo,{artist} {title},{title} {artist},{title} testo,testo {title},testo {title} {artist},{artist} testo,{artist} testo {title},{title} testo {artist},testo {artist},{artist} - {title},{artist} - {title} testo,testo,{firstFeature} {title},{artist} {firstFeature} {title},{firstFeature} {title} testo,{title} {firstFeature},{artist} {firstFeature},{firstFeature} {artist},{firstFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(testo)::[feature-2]',
        template:
          '{secondFeature},{secondFeature} {title} testo,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(testo)::includes[default]&&[feature-1]&&[feature-2]',
        template:
          '{artist},{title},{artist} {title} testo,{artist} {title},{title} {artist},{title} testo,testo {title},testo {title} {artist},{artist} testo,{artist} testo {title},{title} testo {artist},testo {artist},{artist} - {title},{artist} - {title} testo,testo,{firstFeature} {title},{artist} {firstFeature} {title},{firstFeature} {title} testo,{title} {firstFeature},{artist} {firstFeature},{firstFeature} {artist},{firstFeature},{secondFeature},{secondFeature} {title} testo,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(testo)::[feature-3]',
        template:
          '{thirdFeature},{thirdFeature} {title} testo,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(testo)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]',
        template:
          '{artist},{title},{artist} {title} testo,{artist} {title},{title} {artist},{title} testo,testo {title},testo {title} {artist},{artist} testo,{artist} testo {title},{title} testo {artist},testo {artist},{artist} - {title},{artist} - {title} testo,testo,{firstFeature} {title},{artist} {firstFeature} {title},{firstFeature} {title} testo,{title} {firstFeature},{artist} {firstFeature},{firstFeature} {artist},{firstFeature},{secondFeature},{secondFeature} {title} testo,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature},{thirdFeature},{thirdFeature} {title} testo,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(testo)::[@tiktok=true@]',
        template: '{title} tiktok,{artist} tiktok, testo tiktok, italian tiktok',
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'phonk',
    formats: [
      {
        id: generateRandomId(),
        constraint: '(phonk)::[default]',
        template:
          '{artist},{title},{artist} {title},{title} {artist},{title} phonk,{artist} {title} phonk,{title} {artist} phonk,{artist} phonk,brazilian phonk,tiktok phonk,hard phonk,{title} funk,{artist} funk,{artist} {title} funk',
      },
      {
        id: generateRandomId(),
        constraint: '(phonk)::[feature-1]',
        template: '{firstFeature},{firstFeature} {title},{artist} {firstFeature} {title}',
      },
      {
        id: generateRandomId(),
        constraint: '(phonk)::includes[default]&&[feature-1]',
        template:
          '{artist},{title},{artist} {title},{title} {artist},{title} phonk,{artist} {title} phonk,{title} {artist} phonk,{artist} phonk,brazilian phonk,tiktok phonk,hard phonk,{title} funk,{artist} funk,{artist} {title} funk,{firstFeature},{firstFeature} {title},{artist} {firstFeature} {title}',
      },
      {
        id: generateRandomId(),
        constraint: '(phonk)::[feature-2]',
        template:
          '{secondFeature},{secondFeature} {title} phonk,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(phonk)::includes[default]&&[feature-1]&&[feature-2]',
        template:
          '{artist},{title},{artist} {title},{title} {artist},{title} phonk,{artist} {title} phonk,{title} {artist} phonk,{artist} phonk,brazilian phonk,tiktok phonk,hard phonk,{title} funk,{artist} funk,{artist} {title} funk,{firstFeature},{firstFeature} {title},{artist} {firstFeature} {title},{secondFeature},{secondFeature} {title} phonk,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(phonk)::[feature-3]',
        template:
          '{thirdFeature},{thirdFeature} {title} phonk,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(phonk)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]',
        template:
          '{artist},{title},{artist} {title},{title} {artist},{title} phonk,{artist} {title} phonk,{title} {artist} phonk,{artist} phonk,brazilian phonk,tiktok phonk,hard phonk,{title} funk,{artist} funk,{artist} {title} funk,{firstFeature},{firstFeature} {title},{artist} {firstFeature} {title},{secondFeature},{secondFeature} {title} phonk,{secondFeature} {title},{artist} {secondFeature},{title} {secondFeature},{thirdFeature},{thirdFeature} {title} phonk,{thirdFeature} {title},{artist} {thirdFeature},{title} {thirdFeature}',
      },
      {
        id: generateRandomId(),
        constraint: '(phonk)::[@tiktok=true@]',
        template: 'tiktok,{title} tiktok,trending tiktok,tiktok songs,phonk tiktok,trending phonk',
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'none',
    formats: [
      {
        id: generateRandomId(),
        constraint: '(none)::[default]',
        template:
          '{artist} {title},{artist},{title},{title} {artist},{artist} - {title},{title} official audio,{artist} new song,{artist} music,{artist} {title} official audio,{artist} {title} song,{title} {artist} audio,{title} full song,{artist} {title} full song,{title} official',
      },
      {
        id: generateRandomId(),
        constraint: '(none)::[feature-1]',
        template:
          '{firstFeature},{artist} {firstFeature},{firstFeature} {title},{artist} {firstFeature} {title},{artist} {firstFeature} {title} official audio,{artist} {firstFeature} {title} track,{artist} {firstFeature} {title} song',
      },
      {
        id: generateRandomId(),
        constraint: '(none)::includes[default]&&[feature-1]',
        template:
          '{artist} {title},{artist},{title},{title} {artist},{artist} - {title},{title} official audio,{artist} new song,{artist} music,{artist} {title} official audio,{artist} {title} song,{title} {artist} audio,{title} full song,{artist} {title} full song,{title} official,{firstFeature},{artist} {firstFeature},{firstFeature} {title},{artist} {firstFeature} {title},{artist} {firstFeature} {title} official audio,{artist} {firstFeature} {title} track,{artist} {firstFeature} {title} song',
      },
      {
        id: generateRandomId(),
        constraint: '(none)::[feature-2]',
        template:
          '{secondFeature},{artist} {secondFeature},{secondFeature} {title},{artist} {secondFeature} {title},{artist} {secondFeature} {title} official audio,{artist} {secondFeature} {title} track',
      },
      {
        id: generateRandomId(),
        constraint: '(none)::includes[default]&&[feature-1]&&[feature-2]',
        template:
          '{artist} {title},{artist},{title},{title} {artist},{artist} - {title},{title} official audio,{artist} new song,{artist} music,{artist} {title} official audio,{artist} {title} song,{title} {artist} audio,{title} full song,{artist} {title} full song,{title} official,{firstFeature},{artist} {firstFeature},{firstFeature} {title},{artist} {firstFeature} {title},{artist} {firstFeature} {title} official audio,{artist} {firstFeature} {title} track,{artist} {firstFeature} {title} song,{secondFeature},{artist} {secondFeature},{secondFeature} {title},{artist} {secondFeature} {title},{artist} {secondFeature} {title} official audio,{artist} {secondFeature} {title} track',
      },
      {
        id: generateRandomId(),
        constraint: '(none)::[feature-3]',
        template:
          '{thirdFeature},{artist} {thirdFeature},{thirdFeature} {title},{artist} {thirdFeature} {title},{artist} {thirdFeature} {title} official audio',
      },
      {
        id: generateRandomId(),
        constraint: '(none)::includes[default]&&[feature-1]&&[feature-2]&&[feature-3]',
        template:
          '{artist} {title},{artist},{title},{title} {artist},{artist} - {title},{title} official audio,{artist} new song,{artist} music,{artist} {title} official audio,{artist} {title} song,{title} {artist} audio,{title} full song,{artist} {title} full song,{title} official,{firstFeature},{artist} {firstFeature},{firstFeature} {title},{artist} {firstFeature} {title},{artist} {firstFeature} {title} official audio,{artist} {firstFeature} {title} track,{artist} {firstFeature} {title} song,{secondFeature},{artist} {secondFeature},{secondFeature} {title},{artist} {secondFeature} {title},{artist} {secondFeature} {title} official audio,{artist} {secondFeature} {title} track,{thirdFeature},{artist} {thirdFeature},{thirdFeature} {title},{artist} {thirdFeature} {title},{artist} {thirdFeature} {title} official audio',
      },
      {
        id: generateRandomId(),
        constraint: '(none)::[@tiktok=true@]',
        template: 'tiktok,{title} tiktok,trending tiktok,tiktok songs',
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'christmas',
    formats: [
      {
        id: generateRandomId(),
        constraint: '[#christmas]::[default]',
        template: `christmas songs,christmas music,christmas ${new Date().getFullYear()},christmas playlist`,
      },
    ],
  },
  {
    id: generateRandomId(),
    filter: 'halloween',
    formats: [
      {
        id: generateRandomId(),
        constraint: '[#halloween]::[default]',
        template: `halloween songs,halloween music,halloween ${new Date().getFullYear()},halloween playlist`,
      },
    ],
  },
];
