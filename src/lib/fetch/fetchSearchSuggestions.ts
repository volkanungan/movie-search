import { QueryFunction } from '@tanstack/react-query';
import { MovieSearchAPIResponse } from '../APIResponsesTypes';
const API_KEY = '1672fa38';

const fetchSearchSuggestions: QueryFunction<
  MovieSearchAPIResponse,
  ['search-suggestions', string]
> = async ({ queryKey }) => {
  const title = queryKey[1];

  if (!title || title.length < 3) {
    return [];
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
export default fetchSearchSuggestions;
