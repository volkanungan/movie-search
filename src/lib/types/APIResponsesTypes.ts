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

export interface Rating {
  Source: string;
  Value: string;
}

export interface MovieDetailsAPIResponse {
  Poster: string;
  Title: string;
  Type: Video;
  Year: string;
  imdbID: string;
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Rated: string;
  Ratings: Rating[];
  Runtime: string;
  Plot: string;
  Writer: string;
}
