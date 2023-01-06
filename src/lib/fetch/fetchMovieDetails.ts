import { QueryFunction } from '@tanstack/react-query';
import { MovieDetailsAPIResponse } from '../APIResponsesTypes';
const API_KEY = '1672fa38';

const fetchMovies: QueryFunction<
  MovieDetailsAPIResponse,
  ['details', string]
> = async ({ queryKey }) => {
  const id = queryKey[1];

  if (!id) {
    throw new Error('Seach parameter "id" cannot be null');
  }
  const apiRes = await fetch(
    `https://www.omdbapi.com/?i=${id}&plot=short&apikey=${API_KEY}`
  );

  if (!apiRes.ok) {
    throw new Error(
      `https://www.omdbapi.com/?i=${id}&plot=short&apikey=${API_KEY}`
    );
  }

  return apiRes.json();
};
export default fetchMovies;
