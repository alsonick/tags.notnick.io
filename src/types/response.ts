export interface Response {
  success: boolean;
  length: number;
  error?: string;
  tags: string;
  tagsToBeRemoved: string;
  removedTags: string;
  title: string;
  artist: string;
  t: string;
  features: string[];
  hashtags: string[];
  extras: {
    titles?: string;
  };
  url: string;
}
