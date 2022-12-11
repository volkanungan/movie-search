import { QueryFunction } from '@tanstack/react-query';
import { MovieSearchAPIResponse } from './APIResponsesTypes';
const API_KEY = '1672fa38';

const fetchMovies: QueryFunction<
  MovieSearchAPIResponse,
  ['search', string, string | null]
> = async ({ queryKey }) => {
  const title = queryKey[1];
  const type = queryKey[2];

  if (!title || title.length === 0) {
    throw new Error('Seach parameter "title" cannot be null');
  }

  const apiRes = await fetch(
    `https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&type=${type}`
  );

  if (!apiRes.ok) {
    throw new Error(
      `https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&type=${type} fetch failed`
    );
  }

  return apiRes.json();
};
export default fetchMovies;
