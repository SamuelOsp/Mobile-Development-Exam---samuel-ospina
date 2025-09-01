export interface INews {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface IArticle {
  source: ISource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string; 
  content: string;
}

export interface ISource {
  id: string | null;
  name: string;
}
