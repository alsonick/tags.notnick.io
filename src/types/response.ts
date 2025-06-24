export interface Response {
  tagsToBeRemoved: string;
  removedTags: string;
  features: string[];
  hashtags: string[];
  success: boolean;
  artist: string;
  length: number;
  error?: string;
  title: string;
  tags: string;
  extras: {
    titles?: string;
    seo: {
      text: string;
    };
    array: {
      removedTags: string[];
      titles: string[];
      tags: string[];
    };
  };
  url: string;
}
