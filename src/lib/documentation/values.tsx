import { Badge } from '@/components/shadcn/badge';
import { Value } from '@/types/documentation/value';

// Params, Required, Default, Description

export const VALUES_LENGTH: Value[] = [
  // Tags
  {
    placeholder: 'tags',
  },
  {
    placeholder: 'Yes',
  },
  {
    placeholder: 'None',
  },
  {
    placeholder: <p>The generated tags you want to find the length for.</p>,
  },
];

export const VALUES_GENERATE: Value[] = [
  // Artist
  {
    placeholder: 'artist',
  },
  {
    placeholder: 'Yes',
  },
  {
    placeholder: 'None',
  },
  {
    placeholder: (
      <p>
        Name of the artist. You can provide both the <Badge variant={'secondary'}>artist</Badge> and the{' '}
        <Badge variant={'secondary'}>title</Badge> components in this field, e.g.{' '}
        <Badge variant={'secondary'}>Rex Orange County – Pluto Projector</Badge> is appropriate.
      </p>
    ),
  },
  // Title
  {
    placeholder: 'title',
  },
  {
    placeholder: 'Yes',
  },
  {
    placeholder: 'None',
  },
  {
    placeholder: (
      <p>
        Name of the song. Not required if both the artist and title components are provided in the{' '}
        <Badge variant={'secondary'}>artist</Badge> parameter.
      </p>
    ),
  },
  // Features
  {
    placeholder: 'features',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'None',
  },
  {
    placeholder: (
      <p>
        Featured artists. If you provide more than 3 featuring artists, then only the first 3 features will be used when
        generating the tags.
      </p>
    ),
  },
  // TikTok
  {
    placeholder: 'tiktok',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'False',
  },
  {
    placeholder: (
      <p>
        Provides additional tags related to TikTok, It's recommended for songs that are performing well on TikTok (
        <Badge variant={'secondary'}>true</Badge> / <Badge variant={'secondary'}>false</Badge>).
      </p>
    ),
  },
  // Channel
  {
    placeholder: 'channel',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'None',
  },
  {
    placeholder: <p>The name of the YouTube channel you want featured in the generated tags.</p>,
  },
  // Format
  {
    placeholder: 'format',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'Lyrics',
  },
  {
    list: ['lyrics', 'bassboosted', 'nightcore', 'slowed', 'letra', 'phonk', 'testo', 'none'],
  },
  // Shuffle
  {
    placeholder: 'shuffle',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'False',
  },
  {
    placeholder: (
      <p>
        The option to shuffle the generated tags (<Badge variant={'secondary'}>true</Badge> or{' '}
        <Badge variant={'secondary'}>false</Badge>).
      </p>
    ),
  },
  // Genre
  {
    placeholder: 'genre',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'None',
  },
  {
    list: ['none', 'country', 'latin', 'phonk', 'dance', 'pop', 'rap', 'italian'],
  },
  // Verse
  {
    placeholder: 'verse',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'None',
  },
  {
    placeholder: <p>3 short verses. Each individual verse should be separated by a comma.</p>,
  },
  // Custom
  {
    placeholder: 'custom',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'None',
  },
  {
    placeholder: <p>The custom format string template that you want to use.</p>,
  },
  // Log
  {
    placeholder: 'log',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'True',
  },
  {
    placeholder: (
      <p>
        All request data (generated metadata) is logged for debugging purposes, if you wish to not have your data
        logged, then provide <Badge variant={'secondary'}>false</Badge> as the parameter value.
      </p>
    ),
  },
  // Webhook
  {
    placeholder: 'webhook',
  },
  {
    placeholder: 'No',
  },
  {
    placeholder: 'None',
  },
  {
    placeholder: (
      <p>
        Request data is logged in private Discord text channels. You may optionally provide a webhook link to log data
        in your own private channel. Your webhook link is never stored or logged.
      </p>
    ),
  },
];

export const VALUES_VARIABLES: Value[] = [
  // {a}
  {
    placeholder: '{a}',
  },
  {
    placeholder: 'Artist',
  },
  {
    placeholder: <p>Artist component of a song.</p>,
  },
  // {t}
  {
    placeholder: '{t}',
  },
  {
    placeholder: 'Title',
  },
  {
    placeholder: <p>Title component of a song.</p>,
  },
  // {f1}
  {
    placeholder: '{f1}',
  },
  { placeholder: 'Feature 1' },
  { placeholder: <p>First featured artist of a song.</p> },
  // {f2}
  { placeholder: '{f2}' },
  { placeholder: 'Feature 2' },
  { placeholder: <p>Second featured artist of a song.</p> },
  // {f3}
  { placeholder: '{f3}' },
  { placeholder: 'Feature 3' },
  { placeholder: <p>Third featured artist of a song.</p> },
];
