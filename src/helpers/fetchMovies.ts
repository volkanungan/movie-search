import { QueryFunction } from '@tanstack/react-query';
import { MovieSearchAPIResponse } from './APIResponsesTypes';
const API_KEY = '1672fa38';

const fetchMovies: QueryFunction<
  MovieSearchAPIResponse,
  ['search', string]
> = async ({ queryKey }) => {
  const title = queryKey[1];

  if (!title || title.length === 0) {
    throw new Error('Seach parameter title cannot be null');
  }

  const apiRes = await fetch(
    `https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`
  );

  if (!apiRes.ok) {
    throw new Error(
      `https://www.omdbapi.com/?s=${title}&apikey=${API_KEY} fetch failed`
    );
  }

  return apiRes.json();
};
export default fetchMovies;
