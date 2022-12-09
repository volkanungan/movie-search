export type Video = 'movie' | 'series' | 'episode';

export interface Movie {
  Poster: string;
  Title: string;
  Type: Video;
  Year: string;
  imdbID: string;
}

export interface MovieSearchAPIResponse {
  Response: string;
  Search: Movie[];
  totalResults: number;
}
